import ratelimiter from "../config/upstash.js";

const rateLimiter= async(requestAnimationFrame,resizeBy,next)=>{
    try {

        const {success} =await ratelimiter.limit("my-rate-limit");
        if(!success){
            return res.status(429).json({message:"To many requests, please try again later"
            })
        }
    } catch (error) {
        console.log("Rate limit error",error)
    }
}
export default rateLimiter;