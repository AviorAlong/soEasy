const fs = require('fs')

exports.readJosn = async (file)=>{
   let content =  fs.readFileSync(file);
   let jsonObj = JSON.parse(content)
   return jsonObj
}

exports.writeJosn = async (content,file)=>{
    let data = JSON.stringify(content)
    let content =  fs.writeFileSync(file,data);
}
 
 