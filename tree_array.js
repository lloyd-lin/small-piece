let list = [
  {id: 0, pid: "", name: "北京"},
  {id: 1, pid: 0, name: "昌平"},
  {id: 2, pid: 1, name: "顺安"},
  {id: 3, pid: 1, name: "哈哈"},
]

console.log(toTree(list));

function ToTree(arr){
  return dfs(arr, "");
} 
function dfs(arr, local_id){
 const res = [];
 for(let i = 0; i < arr.length; i++) {
    if(arr[i].pid === local_id){
       res.push(arr[i]);
    }
 }
 if(res.length === 0){
    return [];
 }
 for(let i = 0; i < res.length; i++){
    // 递归接上黄老爷的腿
    let temp = dfs(arr, res[i].id);
    if(temp.length !== 0) {
       res[i].subs = temp;
    }
 }
 return res;
}
function wideTraversal(node){
 let queue = node,
     data = [];
 while(queue.length !== 0){
    let shift = queue.shift();
    data.push({
       id: shift.id,
       name: shift.name,
       pid: shift.pid
    });
    let subs = shift.subs;
    if(subs) {
       for(let i = 0; i < subs.length; i++){
          queue.push(subs[i]);
       }
    }
 }
 return data;
}


[
  {
      "id": 0,
      "pid": "",
      "name": "北京",
      "subs": [
          {
              "id": 1,
              "pid": 0,
              "name": "昌平",
              "subs": [
                  {
                      "id": 2,
                      "pid": 1,
                      "name": "顺安"
                  },
                  {
                      "id": 3,
                      "pid": 1,
                      "name": "哈哈"
                  }
              ]
          },
          {
            "id": 4,
            "pid": 0,
            "name": "上海",
            "subs": [
                {
                    "id": 5,
                    "pid": 4,
                    "name": "徐汇"
                },
                {
                    "id": 6,
                    "pid": 4,
                    "name": "黄埔"
                }
            ]
        }
      ]
  }
]