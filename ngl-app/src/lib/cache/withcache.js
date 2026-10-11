import { cacheProvider } from "./init.js";

export function withCache (ttl=3600){
    return async(req,res,next)=>{
        let key = `${req.method}:${req.originalUrl}`;
    //check cache  
    const cached = await cacheProvider.get(key);
    //if yes ->get from cache
    if(cached){
        res.setHeader('X-cache','HIT');
        return res.json(JSON.parse(cached))
    }
    //if NO ->get from DB
    const originalJSON = res.json.bind(res)
    res.json = async(body)=>{
       await cacheProvider.set(key,JSON.stringify(body),ttl)
       if (res.statusCode >= 200 && res.statusCode < 300) {
        await cacheProvider.set(key,JSON.stringify(body),ttl);
        res.setHeader("X-Cache", "MISS");
      }
    }
    //cahed + res

    next();
}}