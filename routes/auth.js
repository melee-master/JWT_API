const router = require("express").Router()
const { check, validationResult } = require("express-validator");
const {users} = require('../db.js');
const bcrypt = require('bcrypt')

router.post('/signup',[
    check("email", "Enter a valid email id")
        .isEmail(),
    check("password", "password length less than 6")
        .isLength({
            min: 6
        })
    
], async (req, res)=>{
    const {password, email} = req.body;
    const errors  = validationResult(req);
    if(!errors.isEmpty){
        return res.status(400).json({errors: errors.array})
    }
    
    let user  = users.find((user)=>{
        return user.email === email; 
    })
    
    if(user){
        return res.status(400).json({"msg": "this user already exists"})
    }
    let hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword)


    res.send("validation passed");




})

module.exports = router