import jwt from "jsonwebtoken"

const verifyToken = (req,res,next)=>{

        try {

                const token = req.cookies.token
                if(!token){
                        return res.status(401).json({
                        authenticated: false,
                        message:"No token found"    
                        })
                }
        
                const decoded = jwt.verify(token,"hello_this_string")
                
                req.user = decoded
                next()
                
        } catch (error) {
                
        }

       
}


export default verifyToken