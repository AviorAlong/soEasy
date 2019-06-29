const Controller = require('egg').Controller;
const crypto = require('crypto');
const xml = require('xml2js');
const util = require('util')
const xmlParser = new xml.Parser({explicitArray : false, ignoreAttrs : true})
const builder = new xml.Builder();
const promiseParser = util.promisify(xmlParser.parseString)
class WXController extends Controller {
    async index() { 
       let {query} = this.ctx;

       let signature = query.signature;
       let echostr = query.echostr;
       let timestamp = query['timestamp'];
       let nonce = query.nonce;
       let oriArray = new Array();
        oriArray[0] = nonce;
        oriArray[1] = timestamp;
        oriArray[2] = "chenyptoken"; //微信开发者中心页面里填的token
        oriArray.sort();
       let original = oriArray.join('');
        console.log("Original str : " + original);
        console.log("Signature : " + signature);
       let scyptoString = this.sha1(original);
        if (signature == scyptoString) {
            this.ctx.body = echostr;
            console.log("Confirm and send echo back");
        } else {
           this.ctx.body = "false";
            console.log("Failed!");
        }
    };

    sha1(str) {
       let md5sum = crypto.createHash("sha1");
        md5sum.update(str);
        str = md5sum.digest("hex");
        return str;
    };

    async wxMsg(){
        let {ctx} = this.ctx;
        let body = ctx.body;
      
       
        console.log('wechat msg:',body)
        let result = await promiseParser(body, {trim: true})
        let msg = JSON.parse(JSON.stringify(result));

        let content = msg.Content
        let toUser = msg.ToUserName
        let fromUser = msg.FromUserName
        let lsInfo = this.ctx.service.wxSevice.getResultByKw(content);
        console.log(result)
        let modelTo =  { 
            ToUserName: fromUser,
            FromUserName: toUser,
            CreateTime: 1460537339,
            MsgType: 'text',
            Content: JSON.stringify(lsInfo)
       }
        let xmlstr =  builder.buildObject(modelTo)
        console.log(xmlstr)
	    this.ctx.body = xmlstr  
    }
}




module.exports = WXController;
