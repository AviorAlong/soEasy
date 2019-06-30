// 回复文本消息
const Service = require('egg').Service
class MsgService extends Service {
   async textMsg(toUser,fromUser,content){
        var xmlContent =  "<xml><ToUserName><![CDATA["+ toUser +"]]></ToUserName>";
            xmlContent += "<FromUserName><![CDATA["+ fromUser +"]]></FromUserName>";
            xmlContent += "<CreateTime>"+ new Date().getTime() +"</CreateTime>";
            xmlContent += "<MsgType><![CDATA[text]]></MsgType>";
            xmlContent += "<Content><![CDATA["+ content +"]]></Content></xml>";
        return xmlContent;
    }
    async graphicMsg(toUser,fromUser,contentArr){
        var xmlContent =  "<xml><ToUserName><![CDATA["+ toUser +"]]></ToUserName>";
           xmlContent += "<FromUserName><![CDATA["+ fromUser +"]]></FromUserName>";
           xmlContent += "<CreateTime>"+ new Date().getTime() +"</CreateTime>";
           xmlContent += "<MsgType><![CDATA[news]]></MsgType>";
           xmlContent += "<ArticleCount>"+contentArr.length+"</ArticleCount>";
           xmlContent += "<Articles>";
           contentArr.map(function(item,index){
               xmlContent += "<item>";
               xmlContent += "<Title><![CDATA["+ item.Title +"]]></Title>";
               xmlContent += "<Description><![CDATA["+ item.Description +"]]></Description>";
               xmlContent += "<PicUrl><![CDATA["+ item.PicUrl +"]]></PicUrl>";
               xmlContent += "<Url><![CDATA["+ item.Url +"]]></Url>";
               xmlContent += "</item>";
           });
           xmlContent += "</Articles></xml>";
       return xmlContent;
    }
    async imgMsg(toUser, fromUser, media_id) {
        var xmlContent = "<xml><ToUserName><![CDATA["+ toUser +"]]></ToUserName>";
            xmlContent += "<FromUserName><![CDATA["+ fromUser +"]]></FromUserName>";
            xmlContent += "<CreateTime>"+ new Date().getTime() +"</CreateTime>";
            xmlContent += "<MsgType><![CDATA[image]]></MsgType>";
            xmlContent += "<Image><MediaId>< ![CDATA["+ media_id +"] ]></MediaId></Image></xml>";
        return xmlContent; 
    }

    
    async vodeoMsg(toUser, fromUser, media_id, title, description) {
        var xmlContent = "<xml><ToUserName><![CDATA["+ toUser +"]]></ToUserName>";
            xmlContent += "<FromUserName><![CDATA["+ fromUser +"]]></FromUserName>";
            xmlContent += "<CreateTime>"+ new Date().getTime() +"</CreateTime>";
            xmlContent += "<MsgType><![CDATA[video]]></MsgType>";
            xmlContent += "<Video><MediaId><![CDATA["+ media_id +"]]></MediaId>";
            xmlContent += "<Title><![CDATA["+ title +"]]></Title>";
            xmlContent += "<Description><![CDATA["+ description +"]]></Description></Video></xml>";
        return xmlContent;  
    }
        
}

module.exports = MsgService

 

