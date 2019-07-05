
const axios = require('axios');

async function httpGet(url,param){
    try {
        let ret = await axios.get(url,{params: param});
        return ret
    }catch(err){
        console.log(err)
    }
}

async function httpPost(url,param){
    try {
        let ret = await axios.post(url,param);
        console.log(url,ret.data.data)
        return ret.data || []
    }catch(err){
        console.log(err)
    }
}


module.exports = {
    httpGet,
    httpPost
}