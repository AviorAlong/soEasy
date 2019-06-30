const Service = require('egg').Service;

class wxService extends Service {
  async getResultByKw(kw) {
      const {ctx} = this;
      if(!kw){
        this.ctx.body = '身边那么多垃圾，随便输入一个呗';
      }
      console.log(`kw:${kw}`)
      const service = ctx.service;
      //查库
      let rName = await ctx.model.Rubbish.findByName(kw);
      let result
      if(rName){
        let cId = await ctx.model.Classify.findById(rName.cId);
        result = Object.assign({},JSON.parse(JSON.stringify(rName)),JSON.parse(JSON.stringify(cId)));
        
      }
      //查不到就去搜
   
      if(!rName){
        let ret = await service.classify.getClassify(kw);
        let name = ret.c_name ;
        let cInfo = ret.mainInfo;
        let cId = await ctx.model.Classify.findByName(cInfo);  
        console.log('查询结果',ret)
        if(cId){
          ctx.model.Rubbish.insert({r_name: name,cId:cId.id})
        }
        result = Object.assign({},ret,JSON.parse(JSON.stringify(cId)));
      }
      return result
      
  }
}

module.exports = wxService;