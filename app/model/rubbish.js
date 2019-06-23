module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;
  
    const Rubbish = app.model.define('rubbish', {
      r_name: STRING(30),
      cId: INTEGER,
      created_at: DATE,
      updated_at: DATE
    });
  
    Rubbish.prototype.findByName = async function(name) {
      return await this.findOne({
        where: {
          c_name: name
        }
      })
    }
  
    Rubbish.prototype.insertOne = async function({r_name,cId}) {
      return await this.create({
            r_name: r_name,
            cId: cId
      });
    }
  
    return Rubbish;
  };