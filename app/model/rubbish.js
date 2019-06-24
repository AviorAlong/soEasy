module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;
  
    const Rubbish = app.model.define('rubbish', {
      r_name: STRING(30),
      cId: INTEGER
    });
  
    Rubbish.findByName = async function(name) {
      return await this.findOne({
        where: {
          r_name: name
        }
      })
    }
  
    Rubbish.insert = async function({r_name,cId}) {
      return await this.create({
            r_name: r_name,
            cId: cId
      });
    }
  
    return Rubbish;
  };