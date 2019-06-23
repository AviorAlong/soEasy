const axios = require('axios');
const Classify = require('./getClassify');
async function httpGet(param){
    try {
        let ret = await axios.get(param);
        return ret.data
    }catch(err){
        console.log(err)
    }
}
async function main(){
    let tmp = await httpGet(`http://weixin.sh-service.com/sites/feiguan/trashTypes_2/TrashQuery.aspx?kw=%E7%94%B5%E6%B1%A0`)
    let result = await Classify.getClassify(tmp);
    console.log(result)
}

main()