const Controller = require('egg').Controller; 

 
class WXController extends Controller {
    async index() { 
       let ctx = this.ctx;
       let {query} = ctx;
       let echostr = query.echostr;
       let authRet = ctx.service.auth.auth();

        if (authRet) {
            
            this.ctx.body = echostr;
            ctx.logger.info("Confirm and send echo back");
        } else {
            this.ctx.body = "false";
            ctx.logger.info("Failed!");
        }
    };
    async menu(){
       return await this.ctx.service.wx.setMenu()
    }
    async wxMsg(){
        let that = this;
        let {ctx} = that;
        let query = ctx.query;
      
        if(!query){
            ctx.logger.info('不可信的消息')
            return that.ctx.body = "success"
        }
       
        try{
            let authRet = ctx.service.auth.auth();
            // return this.ctx.body = "success"
            if(authRet){

                let jMsg = await ctx.service.msg.xmlpaser();
                if(!jMsg){
                    return that.ctx.body = "success"
                }

                let msg = jMsg.xml
                let content = msg.Content
                let toUser = msg.ToUserName
                let fromUser = msg.FromUserName
                ctx.logger.info(msg)
                let msgType = msg.MsgType && msg.MsgType.toLowerCase()
                let event = msg.Event && msg.Event.toLowerCase()
                let xmlstr = '';
                let lsInfo = ''
                ctx.logger.info(`用户${fromUser}搜索词：${content}`)
                if(msgType=== 'text'){
                    switch(content){
                        case '口诀':
                            lsInfo= `猪能吃的是湿垃圾，猪都不要吃的是干垃圾，猪吃了会死的是有害垃圾，可以卖出去换猪的是可回收垃圾`;
                            break;
                        case '互联网人':
                            lsInfo= `不好意思，这类人不适合生产垃圾，因为他们“没-时-间”扔垃圾`;
                            break;
                        case '趣事':
                            lsInfo= `段子手写代码去了，再等等吧`.replace(/^\s*/gm, '');

                            break;
                        case '投放时间':
                            
                            lsInfo= `最新规定:上午7:00至9:00、下午5:30至7:30为垃圾投放时间`
                            break;
                        case /玉萍$/.test(content) === true:
                            
                            lsInfo= `温馨提示，您要找的可能是朕的小可爱，请注意言辞，否则告诉你麻麻` 
                            break;   
                        default: 
                           
                            lsInfo = await ctx.service.wx.getResultByKw(content);
                            console.log('查到的数据：',lsInfo)
                            if(!lsInfo){
                                lsInfo = `未查询到您要查询的垃圾所属的分类(-^-)，小易这就去把老板拖回来给您找`.replace(/^\s*/gm, '');
                            }
                            

                    }
                }else if(msgType==='event'){
                    if(event === 'subscribe'){
                        lsInfo = `
                        你好呀，文明君，欢迎来到垃圾分类搜easy，本宝宝旨在提供便捷的垃圾分类搜索，以及垃圾分类花边趣事 
                        您可
                        输入：“口诀”，查看垃圾分类的野口决；
                        输入: “互联网人”，查看互联网人的垃圾分类；
                        输入：“趣事”，查看垃圾分类趣事问答；
                        输入：“投放时间”，查看最新垃圾分类投放时间；
                        输入：您要查找的垃圾名称，例如 果皮，查看垃圾所属分类`.replace(/^\s*/gm, '');                       
                    }
                }
                xmlstr = await ctx.service.msg.textMsg(fromUser,toUser,lsInfo)
                console.log('转换后的数据：',xmlstr);
                ctx.set('Content-Type', 'text/xml');
                ctx.body = xmlstr;
                return 
                
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
