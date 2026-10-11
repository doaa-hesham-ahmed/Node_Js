import crypto from 'node:crypto';
export function correlatioId(req,res,next){
    const id = crypto.randomUUID();
    req.correlatioId=id;
    res.setHeader('X-correlatin-Id',id);
    next();
}