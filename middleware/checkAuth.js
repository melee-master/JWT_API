const JWT = require("jsonwebtoken")
module.exports= async(req, res, next) => {
    const token = req.header.token('x-auth-token');
    if(!token){
        return res.status(404).json({
            "msg": "token not found"
        })
    }
    try{
        let user = await JWT.verify(token, 'lsdewlkfjweifhweif213123') 
        req.user = user.email;
        next();
    }catch(err){
        return res.status(500).json({
            "msg": "token invalid"
        })
    }



}