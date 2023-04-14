// const { wetag } = require('express/lib/utils');
// const knex = require ('../models/knex')
const {user} = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.getUser = (req, res, next) => {
    res.send({
        message: 'ini respon api',
        nama: 'rifai',
        asal:'tegal'
    });
};
exports.register = async (req,res,next) => {
    try {
    const insertData = req.body
    const hashedPassword = bcrypt.hashSync(insertData.password, 8)
    const regis = await user.create ({
        firstname: insertData.firstname,
        lastname: insertData.lastname,
        username: insertData.username,
        email: insertData.email,
        password: hashedPassword
    })
    console.log(insertData)

    // let regis = await knex('user').insert ({
    //     name: insertData.name,
    //     email: insertData.email,
    // }).then (insertedId => {
    //     return insertedId
    // })
    
    res.status(201).send({
        message: 'user created',
        id: regis.id
    })
    }catch (error){
     return res.status(500).send({
        error:error
     })   
    }
}

exports.login = async (req, res, next) =>{
try {
  const payLoad = req.body
  
  const getUser = await user.findOne ({
    where : {email: payLoad.email}
  })

  if (!getUser) return res.status(404).send ('user not found')
  const comparePassword = bcrypt.compareSync(payLoad.password, getUser.dataValues.password)
  
  if (comparePassword) {
    const token = jwt.sign({id: getUser.dataValues.id, email: getUser.dataValues.email}, process.env.JWT_SECRET, {expiresIn: 3600})
   
    return res.status(200).send({
        message: 'login succes',
        token: token
    })
} else {
    return res.status(400).send('invalid password')
  }

} catch (error){
     return res.status(500).send({
        error:error
     })   
    }
}

exports.getDetailUser = async (req,res, next) => {
 try {
   const params = req.params.id
//    let getUserData = await knex ('user').where({
//     id: params
//    }).select ('*')
const getUser = await user.findOne ({
    where : {email: req.user.email}
  })
  
  if (req.user.id === params) return res.status(403).send('cannot acces another user details')

   res.status (200).send({
    message: 'data user retrieved',
    data: getUser
   })
   

 }
 
    catch (error){
     return res.status(500).send({
        error:error
     })   
    }   
}

exports.deleteUser = async (req,res, next) => {
    try {
      const params = req.params.id
    //   let deletedUser = await knex ('user').where({
    //    id: params
    //   }).del()
      
    //   res.status (200).send({
    //    message: 'data delete deleted',
    //    data: deletedUser[0]
    //   })
   
    }
    
       catch (error){
        return res.status(500).send({
           error:error
        })   
       }   
   }

   exports.updateUser = async (req,res, next) => {
    try {
      const params = req.params.id
      const update = req.body

    //   let updatedUser = await knex ('user').where({
    //    id: params
    //   }).update({name: update.name})
      
    //   res.status (200).send({
    //    message: 'data user updated',
    //    data: updatedUser
    //   })
   
    }
    
       catch (error){
        return res.status(500).send({
           error:error
        })   
       }   
   }