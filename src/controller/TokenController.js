import dotenv from 'dotenv'
dotenv.config()

import User from '../models/User.js'
import jwt  from 'jsonwebtoken'

class TokenController{
  async store(req,res){

    try {
      const {email= '', password =''} = req.body

      if(!email || !password){
        return res.status(401).json({
          errors: ["credenciais invalidas"]
        })
      }

      const user = await User.findOne({where: {email}})

      if(!user){
        return res.status(401).json({
          errors: ["usuario não existe"]
        })
      }


      if(!(await user.passwordIsValid(password))){
        return res.status(401).json({
          errors: ["senha invalida"]
        })
      }

      const {id}= user

      const token = jwt.sign({id,email}, process.env.TOKEN_SECRET,{
        expiresIn: process.env.TOKEN_EXPIRATION
      })

      return res.json({token})

    } catch (e) {

      console.log(e)

      return res.status(500).json({
        errors:['erro no servidor']
      })

    }

  }
}

export default new TokenController()