const Controller = require('egg').Controller;
// const crypto = require('crypto');

 
class WXController extends Controller {
    // async index() { 
    //    let {query} = this.ctx;

    //    let signature = query.signature;
    //    let echostr = query.echostr;
    //    let timestamp = query['timestamp'];
    //    let nonce = query.nonce;
    //    let oriArray = new Array();
    //     oriArray[0] = nonce;
    //     oriArray[1] = timestamp;
    //     oriArray[2] = "chenyptoken"; //微信开发者中心页面里填的token
    //     oriArray.sort();
    //    let original = oriArray.join('');
    //     ctx.logger.info("Original str : " + original);
    //     ctx.logger.info("Signature : " + signature);
    //    let scyptoString = this.sha1(original);
    //     if (signature == scyptoString) {
    //         this.ctx.body = echostr;
    //         ctx.logger.info("Confirm and send echo back");
    //     } else {
    //        this.ctx.body = "false";
    //         ctx.logger.info("Failed!");
    //     }
    // };

    // sha1(str) {
    //    let md5sum = crypto.createHash("sha1");
    //     md5sum.update(str);
    //     str = md5sum.digest("hex");
    //     return str;
    // };

    

    async wxMsg(){
        let that = this;
        let {ctx} = that;
        let query = ctx.query;
        let req = ctx.req;
        let res = ctx.res;
        if(!query){
            ctx.logger.info('不可信的消息')
            return that.ctx.body = "success"
        }
        
        try{
            let authRet = ctx.service.auth.auth();
            let buffer = []
            // return this.ctx.body = "success"
            if(authRet){

                let jMsg = await ctx.service.msg.xmlpaser();
                let msg = jMsg.xml
                let content = msg.Content
                let toUser = msg.ToUserName
                let fromUser = msg.FromUserName
                let msgType = msg.MsgType.toLowerCase()
                if(msgType === 'text'){
                    switch(content){
                        case '口诀': 
                            return 
                        case '花边':
                        default:
    
                    }
                }else if(msgType === 'event'){
                    switch(msgType){
                        case 'subscribe': 
                        case 'click':
    
                    }
                }
                
                ctx.logger.info(jMsg)
                let lsInfo = await ctx.service.wx.getResultByKw(content);
                ctx.logger.info('查到的数据：',lsInfo)
                if(!lsInfo){
                    lsInfo = `暂时未查询到您要查询的垃圾所属的分类，请检查您输入的关键词格式是否正确，例如：如果您要搜索的垃圾是"苹果皮"，请您直接输入 苹果皮`
                }
                let xmlstr = await ctx.service.msg.textMsg(fromUser,toUser,lsInfo)
                ctx.logger.info('转换后的数据：',xmlstr);
                ctx.set('Content-Type', 'text/xml');
                ctx.body = xmlstr
            }else{
                ctx.logger.info('auth 未通过')
                that.ctx.body = 'success' 
            }
        }catch(err){
            ctx.logger.info(`处理消息出错了:${err}`)
            that.ctx.body = 'success' 
        }
        
       
       
    }
}




module.exports = WXController;
