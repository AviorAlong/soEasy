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
      result = `您要找的垃圾"${kw}"属于${classifyInfo.c_name}哦`
      //查不到就去搜
      return result
      
  }
}

module.exports = wxService;