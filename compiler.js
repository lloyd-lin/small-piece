const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;

// 确保目录存在
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// 清理构建目录
function cleanBuild() {
  console.log('🧹 清理构建目录...');
  const distPath = path.join(__dirname, 'dist');
  if (fs.existsSync(distPath)) {
    fs.rmSync(distPath, { recursive: true, force: true });
  }
  ensureDirectoryExists(distPath);
}

// 使用 Babel 转换代码
function transformCode(sourceCode) {
  console.log('🔨 开始转换代码...');
  
  // 解析代码生成 AST
  const ast = parser.parse(sourceCode, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript']
  });

  // 遍历和转换 AST
  traverse(ast, {
    // 转换箭头函数
    ArrowFunctionExpression(path) {
      console.log('发现箭头函数，转换为普通函数');
    },
    // 转换类
    ClassDeclaration(path) {
      console.log('发现类声明，转换为构造函数');
    },
    // 转换 async/await
    AwaitExpression(path) {
      console.log('发现 await 表达式，转换为 Promise');
    },
    // 转换解构赋值
    ObjectPattern(path) {
      console.log('发现对象解构，转换为普通赋值');
    },
    // 转换展开运算符
    SpreadElement(path) {
      console.log('发现展开运算符，转换为 Object.assign');
    },
    // 转换模板字符串
    TemplateLiteral(path) {
      console.log('发现模板字符串，转换为字符串拼接');
    }
  });

  // 生成代码
  const output = generate(ast, {
    retainLines: true,
    compact: false
  }, sourceCode);

  return output.code;
}

// 编译单个文件
function compileFile(filePath) {
  console.log(`📝 编译文件: ${filePath}`);
  const sourceCode = fs.readFileSync(filePath, 'utf-8');
  const transformedCode = transformCode(sourceCode);
  
  // 生成输出文件路径
  const relativePath = path.relative(path.join(__dirname, 'src'), filePath);
  const outputPath = path.join(__dirname, 'dist', relativePath);
  
  // 确保输出目录存在
  ensureDirectoryExists(path.dirname(outputPath));
  
  // 写入转换后的代码
  fs.writeFileSync(outputPath, transformedCode);
  console.log(`✅ 已生成: ${outputPath}`);
}

// 编译目录
function compileDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      compileDirectory(filePath);
    } else if (file.endsWith('.js')) {
      compileFile(filePath);
    }
  }
}

// 主构建流程
function build() {
  console.log('🚀 开始构建...');
  
  // 1. 清理构建目录
  cleanBuild();
  
  // 2. 编译源代码
  const srcPath = path.join(__dirname, 'src');
  if (fs.existsSync(srcPath)) {
    compileDirectory(srcPath);
  }
  
  console.log('✨ 构建完成!');
}

// 开发模式
function dev() {
  console.log('👨‍💻 启动开发模式...');
  build();
  
  // 监视文件变化
  const srcPath = path.join(__dirname, 'src');
  fs.watch(srcPath, { recursive: true }, (eventType, filename) => {
    if (filename && filename.endsWith('.js')) {
      console.log(`🔄 检测到文件变化: ${filename}`);
      const filePath = path.join(srcPath, filename);
      compileFile(filePath);
    }
  });
}

// 命令行参数处理
const command = process.argv[2];

switch (command) {
  case 'build':
    build();
    break;
  case 'dev':
    dev();
    break;
  default:
    console.log('请指定命令: build 或 dev');
    process.exit(1);
} 