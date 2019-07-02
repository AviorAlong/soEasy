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
    //     console.log("Original str : " + original);
    //     console.log("Signature : " + signature);
    //    let scyptoString = this.sha1(original);
    //     if (signature == scyptoString) {
    //         this.ctx.body = echostr;
    //         console.log("Confirm and send echo back");
    //     } else {
    //        this.ctx.body = "false";
    //         console.log("Failed!");
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
      
        if(!query){
            console.log('不可信的消息')
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
                            lsInfo= `不好意思，这类人不适合生产垃圾，因为他们<strong>没时间</strong>扔垃圾`;
                            break;
                        case '趣事':
                            lsInfo= `7月1日早晨，小朱去扔干垃圾，垃圾管理员小张放猪出去试吃，猪不吃，小张便给小朱开了第一张垃圾分类的罚单，罚金200元；
                            小朱很是生气，怒问凭什么开200的罚单，法律规定罚金在50-200之间，为什么不是开50；
                            小张撇了撇嘴说道，行人违反道路交通安全法律，法律规定5-50元罚款，你见过哪个交警开5元的罚单了，
                            小朱暗暗点头，觉得甚是有理，第二天小朱还去扔湿垃圾，结果猪死了，请问小朱第二天扔了什么垃圾？`.replace(/^    /gm, '');

                            break;
                        case '投放时间':
                            
                            lsInfo= `最新规定:上午7:00至9:00、下午5:30至7:30为垃圾投放时间`
                            break;
                        default: 
                           
                            lsInfo = await ctx.service.wx.getResultByKw(content);
                            console.log('查到的数据：',lsInfo)
                            if(!lsInfo){
                                lsInfo = `
                                暂时未查询到您要查询的垃圾所属的分类，请检查您输入的关键词格式是否正确，例如：如果您要搜索的垃圾是"果皮"，请您直接输入 果皮； 
                                您也可
                                输入：“口诀”，查看垃圾分类的野口决；
                                输入: “互联网人”，查看互联网人的垃圾分类；
                                输入：“趣事”，查看垃圾分类趣事问答；
                                输入：“投放时间”，查看最新垃圾分类投放时间；`.replace(/^    /gm, '');
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
                        输入：您要查找的垃圾名称，例如 果皮，查看垃圾所属分类`.replace(/^    /gm, '');                       
                    }
                }
                xmlstr = await ctx.service.msg.textMsg(fromUser,toUser,lsInfo)
                console.log('转换后的数据：',xmlstr);
                ctx.set('Content-Type', 'text/xml');
                ctx.body = xmlstr;
                return 
                
            }else{
                console.log('auth 未通过')
                that.ctx.body = 'success' 
            }
        }catch(err){
            console.log(`处理消息出错了:${err}`)
            that.ctx.body = 'success' 
        }
        
       
       
    }
}




module.exports = WXController;
