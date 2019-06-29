const Controller = require('egg').Controller;
const Service = require('egg').Service;

class ClassifyController extends Controller {
  async index() {
      
      const {ctx} = this;
      let kw = ctx.query.kw;
      if(!kw){
        this.ctx.body = '身边那么多垃圾，随便输入一个呗';
      }
      const service = ctx.service;
      //查库
      let rName = await ctx.model.Rubbish.findByName(kw);
      if(rName){
        let cId = await ctx.model.Classify.findById(rName.cId);
        this.ctx.body = Object.assign({},JSON.parse(JSON.stringify(rName)),JSON.parse(JSON.stringify(cId)));
        return 
      }
      //查不到就去搜
      let ret = await service.classify.getClassify(kw);
      let name = ret.c_name ;
      let cInfo = ret.mainInfo;
      let cId = await ctx.model.Classify.findByName(cInfo);

      if(!rName){
        ctx.model.Rubbish.insert({r_name: name,cId:cId.id})
      }
      
      this.ctx.body = Object.assign({},ret,JSON.parse(JSON.stringify(cId)));
  }
}

module.exports = ClassifyController;