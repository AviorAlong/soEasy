'use strict'
 
const cheerio = require('cheerio');
const axios = require('axios');
const Service = require('egg').Service;

class ClassifyService extends Service {

    async httpGet(param){
        try {
            let ret = await axios.get(`${global.config.search.shfb}`,param);
            return ret.data
        }catch(err){
            console.log(err)
        }
    }
    async getClassify(kw){
        try {
            let htm = await this.httpGet({
                params: {
                    "kw": kw
                }
              })
            let $ = cheerio.load(htm);
            let c_name = $('#txtKeyword').val();
            let searchKey = c_name;
            let mainInfo =$('.info > p > span').text()
          
            return {
                c_name: c_name,
                searchKey: searchKey,
                mainInfo: mainInfo
            }
        }catch(err){
            console.log(err)
            return false
        }
       
    }

}

module.exports = ClassifyService;

