// 使用现代 JavaScript 特性的示例代码
const sum = (a, b) => a + b;

class Calculator {
  constructor() {
    this.value = 0;
  }

  add(x) {
    this.value += x;
    return this;
  }

  subtract(x) {
    this.value -= x;
    return this;
  }

  getValue() {
    return this.value;
  }
}

// 使用 async/await
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

// 使用解构和展开运算符
const person = {
  name: 'John',
  age: 30,
  city: 'New York'
};

const { name, ...rest } = person;

// 使用模板字符串
const greeting = `Hello, ${name}!`;

// 导出模块
export {
  sum,
  Calculator,
  fetchData,
  greeting
}; 