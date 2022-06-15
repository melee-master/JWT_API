const router = require("express").Router()
const { check, validationResult } = require("express-validator");
const {users} = require('../db.js');
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
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
    users.push({
        email, 
        password: hashedPassword
    })
    const token = await jwt.sign({
        email
    }, 'lsdewlkfjweifhweif213123', {
        expiresIn: 360000
    })

    res.json({token})
})

router.post('/login', async (req, res)=> {
    const {email, password} = req.body;
    let user  =  users.find((user)=> {
        return user. email === email;
    });
    if(!user){
        return req.status(404).json({"msg": "invalid credentials"})
    };
    let isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
        return req.status(404).json({"msg": "invalid credentials"})
    };
    const token = await jwt.sign({
        email
    }, 'lsdewlkfjweifhweif213123', {
        expiresIn: 360000
    })

    res.json({token})


})



router.get('/all', (req, res)=> {
    res.json(users);
})

module.exports = router