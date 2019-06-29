'use strict'
 
const cheerio = require('cheerio');
const axios = require('axios');
const Service = require('egg').Service;

class ClassifyService extends Service {

    async httpGet(param){
        try {
            let ret = await axios.get(`http://weixin.sh-service.com/sites/feiguan/trashTypes_2/TrashQuery.aspx`,param);
            return ret.data
        }catch(err){
            console.log(err)
        }
    }
    async getClassify(kw){
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
    }

}

module.exports = ClassifyService;

