const Controller = require('egg').Controller;

class DataController extends Controller {
  async import() {
      
      const {ctx} = this;
      const body = ctx.request.body;
      console.log('----------data--------------',body)
      let r_name = body.r_name
      //查库
      let r = await ctx.model.Rubbish.findByName(r_name);
      if(r){
        await ctx.model.Rubbish.update({r_content:body.r_content},{where:{id:r.id}})
      }else{
        await ctx.model.Rubbish.insert(body)
      }
  }
}

module.exports = DataController;