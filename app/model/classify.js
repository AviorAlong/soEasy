module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;
  
    const Classify = app.model.define('classify', {
      c_type: INTEGER,
      c_name: STRING(64),
      c_explainTit: STRING(64),
      c_explain: STRING(1024),
      c_includeTit: STRING(64),
      c_include: STRING(1024),
      c_demandTit: STRING(64),
      c_demand: STRING(1024)
    });
  
    Classify.findByName = async function(name) {
      return await this.findOne({
        where: {
          c_name: name
        }
      })
    }
    Classify.findById = async function(id) {
      return await this.findOne({
        where: {
          id: id
        }
      })
    }
    Classify.findById = async function(ids,limit=3) {
      return await this.findAll({
        where: {
          id: ids
        },
        limit:limit
      })
    }
  
    return Classify;
  };