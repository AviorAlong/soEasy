const Controller = require('egg').Controller;

class WXController extends Controller {
    async index() { 
       let {query} = this.ctx;
       console.log("*** URL:" + request.url);
       console.log(query);
       let query = url.parse(request.url, true).query;

       let signature = query.signature;
       let echostr = query.echostr;
       let timestamp = query['timestamp'];
       let nonce = query.nonce;
       let oriArray = new Array();
        oriArray[0] = nonce;
        oriArray[1] = timestamp;
        oriArray[2] = "token"; //微信开发者中心页面里填的token
        oriArray.sort();
       let original = oriArray.join('');
        console.log("Original str : " + original);
        console.log("Signature : " + signature);
       let scyptoString = sha1(original);
        if (signature == scyptoString) {
            this.body = echostr;
            console.log("Confirm and send echo back");
        } else {
           this.body = "false";
            console.log("Failed!");
        }
    };
    sha1(str) {
       let md5sum = crypto.createHash("sha1");
        md5sum.update(str);
        str = md5sum.digest("hex");
        return str;
    }
}

module.exports = WXController;