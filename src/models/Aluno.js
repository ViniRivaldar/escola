import Sequelize, {Model} from "sequelize";

export default class Aluno extends Model{
  static init (sequelize){
    super.init({
      nome:{
        type:Sequelize.STRING,
        defaultValue: '',
        validate:{
          len:{
            args:[3,255],
            msg: 'nome precisa ter de 3 a 25 caracter'
          }
        }
      },
      sobrenome:{
        type:Sequelize.STRING,
        defaultValue: '',
        validate:{
          len:{
            args:[3,255],
            msg: 'nome precisa ter de 3 a 25 caracter'
          }
        }
      },

      email:{
        type:Sequelize.STRING,
        defaultValue: '',
        unique:{
          msg:'email ja existe'
        },
        validate:{
          isEmail:{
            msg: 'email invalido'
          }
        }
      },
      idade:{
        type:Sequelize.INTEGER,
        defaultValue: '',
        validate:{
          isInt:{
            msg: 'idade invalida'
          }
        }
      },
      peso:{
        type:Sequelize.FLOAT,
        defaultValue: '',
        validate:{
          isFloat:{
            msg: 'peso invalido'
          }
        }
      },
      altura:{
        type:Sequelize.FLOAT,
        defaultValue: '',
        validate:{
          isFloat:{
            msg: 'altura invalido'
          }
        }
      },
    },{
      sequelize
    })

  }

  static associate(models){
    this.hasMany(models.Foto,{foreignKey: 'aluno_id'})
  }
}