


 (async()=>{
       
    let data = require('../data/allData.json').data;
    let type = {"1":3,"2":2,"3":3,"4":1}
    let utilHttp = require('../app/util/easyRequest')
    for(let i in data){
        let r_name = data[i].wiki_title;
        let cId = type[data[i].wiki_type];
        let content = data[i].wiki_content;
        let url = "http://47.98.167.18:80/data/import"
        await utilHttp.httpPost(url,{"r_name":r_name,"cId":cId,"r_content":content})
    }
 })()

 




