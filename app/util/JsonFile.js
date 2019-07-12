const fs = require('fs')

exports.readJosn = async (file)=>{
   let content =  fs.readFileSync(file);
   let jsonObj = JSON.parse(content)
   return jsonObj
}

exports.writeJosn = async (file,content)=>{
    let data = JSON.stringify(content)
    fs.writeFileSync(file,data);
}
 
 