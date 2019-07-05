const Controller = require('egg').Controller;

class DataController extends Controller {
  async import() {
      
      const {ctx} = this;
      const body = ctx.query;
      const service = ctx.service;
       
      //查库
      let r = await ctx.model.Rubbish.findByName(r_name);
      if(r){
        await ctx.model.Rubbish.update({where:{id:r.id}},{r_content:body.r_content})
      }else{
        await ctx.model.Rubbish.insert(body)
      }
  }
}

module.exports = DataController;