import Sequelize, {Model} from "sequelize";

import AppConfig from "../config/AppConfig.js";

export default class Foto extends Model{
  static init (sequelize){
    super.init({
      originalname:{
        type:Sequelize.STRING,
        defaultValue: '',
        validate:{
          notEmpty:{
            msg: 'o campo não ser vazio'
          }
        }
      },
      filename:{
        type:Sequelize.STRING,
        defaultValue: '',
        validate:{
          notEmpty:{
            msg: 'o campo não ser vazio'
          }
        }
      },
      url:{
        type:Sequelize.VIRTUAL,
        get(){
          return `${AppConfig.url}/images/${this.getDataValue('filename')}`
        }
      }
    },{
      sequelize
    })

  }

  static associate(models){
    this.belongsTo(models.Aluno, {foreignKey: 'aluno_id'})
  }
}