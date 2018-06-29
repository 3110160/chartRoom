const fs = require('fs');

// 写文件封装
const writeFile = (path,data) =>{
    return new Promise((resolve,reject)=>{
        fs.writeFile(path,data,(err)=>{
            if(err) reject(err);
            resolve('success');
        })
    })
}
// 读文件封装
const readFile = path =>{
    return new Promise((resolve,reject)=>{
        fs.readFile(path,'utf8',(err,data)=>{
            if(err) reject(err);
            resolve(data);
        })
    })
}

export { writeFile,readFile };