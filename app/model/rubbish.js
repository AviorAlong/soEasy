module.exports = app => {
    
    const { STRING, INTEGER, OP} = app.Sequelize;
  
    const Rubbish = app.model.define('rubbish', {
      r_name: STRING(64),
      cId: INTEGER,
      r_content: STRING
    });
  
    Rubbish.findByName = async function(name) {
      return await this.findOne({
        where: {
          r_name: name
        }
      })
    }
  
    Rubbish.insert = async function({r_name,cId,r_content}) {
      return await this.create({
            r_name: r_name,
            cId: cId,
            r_content:r_content
      });
    }
    Rubbish.findAllByParam= async function(param,limit){
      return await this.findAll({
        where: param,
        limit: limit || 1
      })
    }
  
    return Rubbish;
  };