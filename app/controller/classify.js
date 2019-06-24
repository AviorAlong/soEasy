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
      let ret = await service.classify.getClassify(kw);
      let name = ret.c_name ;
      let cInfo = ret.mainInfo;
      let rName = await ctx.model.Rubbish.findByName(name);
      let cId = await ctx.model.Classify.findByName(cInfo);
      if(!rName){
        ctx.model.Rubbish.insert({r_name: name,cId:cId.id})
      }
      
      this.ctx.body = Object.assign({},ret,JSON.parse(JSON.stringify(cId)));
  }
}

module.exports = ClassifyController;