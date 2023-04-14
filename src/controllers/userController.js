const { wetag } = require('express/lib/utils');
const knex = require ('../models/knex')
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
    let regis = await knex('user').insert ({
        name: insertData.name,
        email: insertData.email,
    }).then (insertedId => {
        return insertedId
    })
    
    res.status(201).send({
        message: 'user created',
        id: regis[0]
    })
    }catch (error){
     return res.status(500).send({
        error:error
     })   
    }
}

exports.getDetailUser = async (req,res, next) => {
 try {
   const params = req.params.id
   let getUserData = await knex ('user').where({
    id: params
   }).select ('*')
   
   res.status (200).send({
    message: 'data user retrieved',
    data: getUserData[0]
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
      let deletedUser = await knex ('user').where({
       id: params
      }).del()
      
      res.status (200).send({
       message: 'data delete deleted',
       data: deletedUser[0]
      })
   
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

      let updatedUser = await knex ('user').where({
       id: params
      }).update({name: update.name})
      
      res.status (200).send({
       message: 'data user updated',
       data: updatedUser
      })
   
    }
    
       catch (error){
        return res.status(500).send({
           error:error
        })   
       }   
   }