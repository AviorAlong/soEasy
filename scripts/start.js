const axios = require('axios');
// const Classify = require('./getClassify');
const fs = require('fs');
const _ = require('lodash')
const path = require('path')

async function httpGet(url,param){
    try {
        let ret = await axios.get(url,param);
        return ret.data
    }catch(err){
        console.log(err)
    }
}

async function httpPost(url,param){
    try {
        let ret = await axios.post(url,param);
        return ret.data
    }catch(err){
        console.log(err)
    }
}

async function main(kw){
    let allKeys = []
    let allInfo = []
    for(let t = 1;t <=19;t++ ){

        let data = await httpPost(`http://api.lvsediqiu.com/official/wiki/list`,{"page":t})
        let mainInfo = data.data;
        let keys = _.map(mainInfo,(m)=>{return m.wiki_title})
        allKeys = _.union(allKeys, keys);
        allInfo = _.union(allInfo, mainInfo)
    }
    let dataFile = path.join(__dirname,'../data/allData.json')
    let keysFile = path.join(__dirname,'../data/keys.json')
    console.log(allKeys.length)
    fs.writeFileSync(dataFile,JSON.stringify({data:allInfo}))
    fs.writeFileSync(keysFile,JSON.stringify({keys:allKeys}))
}




async function toGetallInfo(){
    let keys = require('../data/keys.json')
    for(let i in keys.keys){
       await httpGet('http://127.0.0.1:7001/classify',{kw:i})
    }
}
toGetallInfo()