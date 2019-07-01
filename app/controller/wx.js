const Controller = require('egg').Controller;
// const crypto = require('crypto');
const xml = require('xml2js');
const util = require('util')
const xmlParser = new xml.Parser({explicitArray : false, ignoreAttrs : true,trim:true})
const promiseParser = util.promisify(xmlParser.parseString)
 
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
        let req = ctx.req;
        if(!query){
            console.log('不可信的消息')
            return that.ctx.body = "success"
        }
        
        try{
            let authRet = ctx.service.auth.auth();
            let buffer = []
            req.on('data',function(data){
                buffer.push(data);
            });
            req.on('end',async function(){
                if(authRet){

                    let result = await promiseParser(buffer);
                    let jMsg = JSON.parse(JSON.stringify(result));
                    let msg = jMsg.xml
                    let content = msg.Content
                    let toUser = msg.ToUserName
                    let fromUser = msg.FromUserName
                    console.log(result)

                    let lsInfo = await ctx.service.wx.getResultByKw(content);
                    console.log('查到的数据：',lsInfo)
                    if(!lsInfo){
                        lsInfo = `暂时未查询到您要查询的垃圾所属的分类，请检查您输入的关键词格式是否正确，例如：如果您要搜索的垃圾是”苹果皮“，请您直接输入 苹果皮`
                    }
                    let xmlstr = await ctx.service.msg.textMsg(fromUser,toUser,lsInfo)
                    console.log('转换后的数据：',xmlstr)
                    that.ctx.body = "success"  
                    ctx.response.body = "success"
                       
                    
                }else{
                    console.log('auth 未通过')
                    that.ctx.body = 'success' 
                }
            })
        }catch(err){
            console.log(`处理消息出错了:${err}`)
            that.ctx.body = 'success' 
        }
        
       
       
    }
}




module.exports = WXController;
