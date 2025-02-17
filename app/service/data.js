'use strict'
 
const cheerio = require('cheerio');
const axios = require('axios');
const Service = require('egg').Service;
const utilHttp = require('../util/easyRequest')
const ljDict = {
    "干垃圾":1,
    "湿垃圾":2,
    "可回收物":3,
    "有害垃圾":4
} 
const ljNumDict = {
    "1":"干垃圾",
    "2":"湿垃圾",
    "3":"可回收物",
    "4":"有害垃圾"
} 
const idDict = {"1":3,"2":2,"3":3,"4":1}
class ClassifyService extends Service {
    async getClassifyFromShfb(kw){
        try {
            let htm = await utilHttp.httpGet(`${this.config.search.shfb}`,{"kw": kw})
            let $ = cheerio.load(htm);
            let r_name = $('#txtKeyword').val();
            let c_name =$('.info > p > span').text()
            console.log(`${this.config.search.shfb}:${htm}`)
            if(c_name && r_name){
                let id = ljDict[c_name.trim()];
                let tmp = {
                    r_name,
                    cId: id,
                    r_content:''
                }
                let a = await this.ctx.model.Rubbish.findByName(r_name)
                if(!a){
                    await this.ctx.model.Rubbish.insert(tmp)
                }
                return [{r_name,c_name,cId:id,r_content:''}]
            }  
            

            return []
            
        }catch(err){
            console.log(err)
            return false
        }
       
    }


    async getClassifyFromLsdp(kw){
        try {
            let data = await utilHttp.httpPost(`${this.config.search.lsdq}`,{"keyword": kw})
            let lj = []
            for(let i of data){
                let r_name = i.wiki_title
                let cId = idDict[i.wiki_type]
                let r_content = i.wiki_content
                let c_name = ljNumDict[cId]
                let tmp = {r_name,cId,r_content}
                let tmpr = {r_name,c_name,cId,r_content}
                lj.push(tmpr)
                let a = await this.ctx.model.Rubbish.findByName(r_name)
                if(!a){
                    await this.ctx.model.Rubbish.insert(tmp)
                }
               

            }
            
            return lj
        }catch(err){
            console.log(err)
            return false
        }
       
    }

}

module.exports = ClassifyService;

