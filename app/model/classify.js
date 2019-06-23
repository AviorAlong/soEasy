module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;
  
    const Classify = app.model.define('classify', {
      c_type: INTEGER,
      c_name: STRING(64)
    });
  
    Classify.prototype.findByName = async function(name) {
      return await this.findOne({
        where: {
          c_name: name
        }
      })
    }
  
    return Classify;
  };