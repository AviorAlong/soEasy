// 回复文本消息
const Service = require('egg').Service
const xml2js = require('xml2js').parseString;
const util = require('util')


class MsgService extends Service {

    async xmlpaser(){
        let that = this;
        return new Promise((resolve,reject)=>{
            let data = '';
            let json = {};
            that.ctx.req.setEncoding('utf8');
            that.ctx.req.on('data',function(chunk){
                data += chunk;
            });
    
            that.ctx.req.on('end',function(){
                xml2js(data,{trim:true,explicitArray:false},function(err,json){
                    //自己的操作
                    if(err){
                        console.log('parse xml error',err)
                       return reject('xml parse error')
                    }
                    console.log("res is "+JSON.stringify(json));
                    resolve(json);
                })
            });
        });
    }

    async textMsg(toUser,fromUser,content){
     let  txtXml = `<xml><ToUserName><![CDATA[${toUser}]]>
     </ToUserName><FromUserName><![CDATA[${fromUser}]]>
     </FromUserName><CreateTime>${new Date().getTime()}</CreateTime>
     <MsgType><![CDATA[text]]></MsgType><Content><![CDATA[${content}]]>
     </Content></xml>`
      
        return  txtXml;
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

 

