const jwt=require("jsonwebtoken");
const expressError=require("../utils/expressError");

const verifyToken=(req,res,next)=>{
    const authHeader=req.headers["authorization"];
    const token=authHeader && authHeader.split(" ")[1];

    if(!token){
        return next(new expressError(401,"Access denied. No token provided."));
    }

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
            req.user=decoded;
            next();
        }catch(err){
            return next(expressError(403, "Invalid or expired token."));
        }
    
};

module.exports=verifyToken;
