import Sequelize, {Model} from "sequelize";
import bcryptjs from "bcryptjs";

export default class User extends Model{
  static init (sequelize){
    super.init({
      nome:{
        type:Sequelize.STRING,
        defaultValue: '',
        validate:{
          len:{
            args:[3,255],
            msg:'O Campo de nome tem que ter de 3 a 255 caracter'
          }
        }
      },
      email:{
        type:Sequelize.STRING,
        defaultValue: '',
        unique:{
          msg: 'Email inválido'
        },
        validate:{
          isEmail:{
            msg:'Email enválido'
          }
        }
      },
      password_hash:{
        type:Sequelize.STRING,
        defaultValue: '',
      },
      password:{
        type:Sequelize.VIRTUAL,
        defaultValue: '',
        validate:{
          len:{
            args:[6,50],
            msg:'A Senha tem que ter de 6 a 50 caracter'
          }
        }
      },
    },{
      sequelize
    })

    this.addHook('beforeSave', async user =>{
      if(user.password){
        user.password_hash = await bcryptjs.hash(user.password, 8)
      }


    })
    return this
  }

  passwordIsValid(password){
    return bcryptjs.compare(password, this.password_hash)
  }
}