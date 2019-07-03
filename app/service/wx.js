const Service = require('egg').Service;
const path = require('path')
const utilReq = require('../util/easyRequest')
const utilJson = require('../util/JsonFile')
const menuConf = require('../../config/menu')
const expiresIn = 7180
class wxService extends Service {
   
  async getAccessToken(){
      let file = path.join(__dirname,'../../data/wx.json')
      let token =  utilJson.readJosn(file)
      let curTime = Date.parse(new Date())/1000;
      if(token.token && token.startTime){
         let expires = curTime - token.startTime 
         if(expires < 7200){
           return token
         }
      }
      let appid = global.config.wxParam.appid;
      let secret = global.config.wxParam.appSecret
      let url = global.config.wxApi.access_token
      let params = {grant_type:"client_credential",appid:appid,secret:secret}
      let ret = await utilReq.httpGet(url,params)
      if(ret){
        let access_token = ret.access_token;
        let startTime =  Date.parse(new Date())/1000;
        let cont = {
          "token": access_token,
          "startTime": startTime
        }
        utilJson.writeJosn(file,cont)
        return access_token
      }else{
        return false
      }
  }

  async setMenu(){
    let token  = await this.getAccessToken();
    let url = `${global.config.wxApi.menu}${token}`;
    let ret = await utilReq.httpPost(url,menuConf);
    if(ret.errcode === 0){
      return true
    }else{
      this.logger.info(ret)
      return false
    }
  };

  async getResultByKw(kw) {
      const {ctx} = this;
      if(!kw){
        this.ctx.body = '身边那么多垃圾，随便输入一个呗';
      }
      
      const service = ctx.service;
      //查库
      let rName = await ctx.model.Rubbish.findByName(kw);
      let result = '';
      let classifyInfo = '';
      if(rName && rName.cId){
        classifyInfo = await ctx.model.Classify.findById(rName.cId);
        
      }else{
        let ret = await service.classify.getClassify(kw);
        if(ret && ret.mainInfo){
          let cInfo = ret.mainInfo;
          classifyInfo = await ctx.model.Classify.findByName(cInfo); 
        }else{
          return false
        }
       
      }
      result = `"${kw}"属于"${classifyInfo.c_name}"\n` +
               `${classifyInfo.c_explainTit}:${classifyInfo.c_explain}\n`+
               `${classifyInfo.c_includeTit}:${classifyInfo.c_include}\n`+
               `${classifyInfo.c_demandTit}:${classifyInfo.c_demand}`
      //查不到就去搜
      return result
      
  }
}

module.exports = wxService;