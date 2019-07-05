const Service = require('egg').Service;
const path = require('path')
const utilReq = require('../util/easyRequest')
const utilJson = require('../util/JsonFile')
const menuConf = require('../../config/menu')
const Sequelize = require('sequelize');
const _ = require('lodash');
const Op = Sequelize.Op;
const expiresIn = 7180

class wxService extends Service {
   
  async getAccessToken(){
      let file = path.join(__dirname,'../../data/wx.json')
      let token =  utilJson.readJosn(file)
      let curTime = Date.parse(new Date())/1000;
      if(token.token && token.startTime){
         let expires = curTime - token.startTime 
         if(expires < expiresIn){
           return token
         }
      }
      let appid = this.config.wxParam.appid;
      let secret = this.config.wxParam.appSecret
      let url = this.config.wxApi.access_token
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
    let url = `${this.config.wxApi.menu}${token}`;
    let ret = await utilReq.httpPost(url,menuConf);
    if(ret.errcode === 0){
      return true
    }else{
      this.logger.info(ret)
      return false
    }
  };
  //实物信息
  realMsg(r,c){
    return `"${r}"属于"${c.c_name}"\n` +
    `${c.c_explainTit}:${c.c_explain}\n`+
    `${c.c_includeTit}:${c.c_include}\n`+
    `${c.c_demandTit}:${c.c_demand}`
  }
  // 推荐信息
  recommenMsg(msg){
    return `"${kw}":"${classifyInfo.c_name}"\n`
  }

  //处理数据
  getSearchMsg(classifies,allRubs){
      let rMsg = '';
      let rcMsg = ''
      for(let i of allRubs){
        //实物  
        let c = _.find(classifies,(cs)=>{return cs.id = i.cId})
        if(i.r_name === kw){
          rMsg = this.realMsg(i.r_name,c);
        }else{
        //推荐
          rcMsg = `${rcMsg}${this.recommenMsg(i.r_name,c)}`
        }
    }
    return {rMsg,rcMsg}
  }
  someFunny(){
    return `老板出去吃大餐了，没空给您查小垃圾 \n 大众点评温馨提示您：吃都吃得没滋没味，怎能活得有滋有味`
  }
  async getResultByKw(kw) {
      const {ctx} = this;
      if(!kw){
        this.ctx.body = '身边那么多垃圾，随便输入一个呗';
      }
      
      const service = ctx.service;
      //查垃圾
  
      let rub = await Promise.all([ctx.model.Rubbish.findByName(kw),ctx.model.Rubbish.findAllByParam({r_name:{[Op.like]:kw}},5)]);
      let result = '';
      let classifies = [];
      let uniqRet = rub[0];
      let unUniqRet = rub[1] || [];
      let cids =  _.map(unUniqRet,(u)=>{return u.cId})
      //合并数据
      if(uniqRet && uniqRet.cId){
         unUniqRet  = unUniqRet.push(uniqRet);
        cids = _.uniq(cids.push(uniqRet.cId))
      }
      let allRubs = unUniqRet;
      if(cids.length > 0){
        //查垃圾分类
        classifies = await ctx.model.Classify.findAllById(cids);
        let {rMsg,rcMsg} = this.getSearchMsg(classifies,allRubs)
        // 拼接结果
        result = `${rMsg?`${rMsg}\n`:`没有找到您心仪的小垃圾，小易已经去帮您问了`}${rcMsg?`\n猜您还想找:\n${rcMsg}`:''}`
      }else{
        // 去两个网站查数据
        let ret = await Promise.all([service.data.getClassifyFromShfb(kw),service.data.getClassifyFromLsdp(kw)]) ;
        let shfb = ret[0] || [];
        let lsdq = ret[1] || [];
        //合并数据并去重
        allRubs = _.union(shfb,lsdq,'r_name')

        if(allRubs.length > 0){
          let cids = _.map(allRubs,(a)=>{return a.cId})
          classifies = await ctx.model.Classify.findAllById(cids);
          let {rMsg,rcMsg} = this.getSearchMsg(classifies,allRubs)
          result = `${rMsg?`${rMsg}\n`:`没有找到您心仪的小垃圾，小易已经去帮您问了`}${rcMsg?`\n猜您还想找:\n${rcMsg}`:''}`
          
        }else{
          result =  this.someFunny()
        }
       
        
       
      }
    
      //查不到就去搜
      return result
      
  }
}

module.exports = wxService;