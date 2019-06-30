const Controller = require('egg').Controller;
// const crypto = require('crypto');
const xml = require('xml2js');
const util = require('util')
const xmlParser = new xml.Parser({explicitArray : false, ignoreAttrs : true,trim:true})

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

    async promiseParser(){
        return util.promisify(xmlParser.parseString)
    }
    
    async wxMsg(){
        let {ctx} = this;
        let query = ctx.query;
        let req = ctx.request;
        if(!query){
            console.log('不可信的消息')
            return this.ctx.body = "success"
        }
        
        try{
            let authRet = ctx.service.AuthSevice.auth();
            let buffer = []
            req.on('data',function(data){
                buffer.push(data);
            });
            req.on('end',function(){
                if(authRet){

                    let result = await promiseParser(body)
                    let msg = JSON.parse(JSON.stringify(result));
            
                    let content = msg.Content
                    let toUser = msg.ToUserName
                    let fromUser = msg.FromUserName
                    let lsInfo = this.ctx.service.wxSevice.getResultByKw(content);
                    if(lsInfo){
                        lsInfo =  JSON.stringify(lsInfo)
                    }else{
                        lsInfo = `暂时未查询到您要查询的垃圾所属的分类，您可以试试口诀"猪吃是湿，猪不吃是干"`
                    }
                    console.log(result)
                    let xmlstr = ctx.service.MsgService.textMsg(fromUser,toUser,lsInfo)
                    this.ctx.body = xmlstr  
                       
                    
                }else{
                    console.log('auth 未通过')
                    this.ctx.body = 'success' 
                }
            })
        }catch(err){
            console.log(`处理消息出错了:${err}`)
            this.ctx.body = 'success' 
        }
        
       
       
    }
}




module.exports = WXController;
