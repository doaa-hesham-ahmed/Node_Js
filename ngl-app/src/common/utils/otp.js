import crypto from "node:crypto"
export function generatedOtp (){
 return crypto.randomInt(100000, 999999).toString();
} 