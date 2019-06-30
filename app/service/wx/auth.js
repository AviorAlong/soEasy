const service = require('egg').Service
class AuthSevice extends service{
    async auth(){
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
            return true 
         } else {
           return false
         }
    }

    
    sha1(str) {
        let md5sum = crypto.createHash("sha1");
         md5sum.update(str);
         str = md5sum.digest("hex");
         return str;
     };
}
module.exports = AuthSevice
