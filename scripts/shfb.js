'use strict'
 
const cheerio = require('cheerio');

exports.getClassify = async (htm)=>{
    let $ = cheerio.load(htm);
    let c_name = $('#txtKeyword').val();
    let searchKey = c_name;
    let mainInfo =$('.info > p > span').text()
    // let explainCont =$('.kp2 .title > div').text()
    // let explainInclude =$('.kp2 .tit')        
    // let explainDesc =$('.kp2 .desc ').text()
    // let explainDemand = $('.kp2 > ul')
    // let explainTit = [];
    // let explainDem = [];
    // for(i in explainInclude('p').items()){
    //     explainTit.append(i.text())
    // }
            
    // for (d in explainDemand('li').items()){
    //     explainDem.append(d.text())
    // }
            
    return {
        c_name: c_name,
        searchKey: searchKey,
        mainInfo: mainInfo
    }
}