import { z } from "zod";
import { config } from "dotenv";
config()
const Schema = z.object({
    PORT:z.string().default('3000'),

    MONGOOSE_URL:z.string(),

    MAIL_USER:z.string().trim().toLowerCase(),
    MAIL_PASSWORD:z.string(),

    //JWT_SECRET:z.string(),
    ACCESS_SECRET:z.string(),
    REFRESH_SECRET:z.string(),

    GOOGLE_OAUT_CLIENT_ID:z.string(),

    REDIS_HOST:z.string(),
    REDIS_PORT:z.string().describe('6379'),
    REDIS_PASSWORD:z.string(),

    MAILJET_API_KEY:z.string(),
    MAILJET_API_SECRET:z.string(),
    MAILJET_FROM_EMAIL:z.string(),
    MAILJET_FROM_NAME:z.string(),
})

const parsed =  Schema.parse(process.env);
export const env ={
    
    port:Number(parsed.PORT),
    db:{
        url:parsed.MONGOOSE_URL,
    },
    google:{
       authClientId:parsed.GOOGLE_OAUT_CLIENT_ID,
    },
    jwt:{
      //secret:parsed.JWT_SECRET,
      accessScret:parsed.ACCESS_SECRET,
      refreshScret:parsed.REFRESH_SECRET,
    },
    redis:{
        host:parsed.REDIS_HOST,
        port:parsed.REDIS_PORT,
        password:parsed.REDIS_PASSWORD,
    },
    nodemailer:{
        user:parsed.MAIL_USER,
        mailPassword:parsed.MAIL_PASSWORD,
    },
    mailjet:{
        apiKey:parsed.MAILJET_API_KEY,
        apiSecret:parsed.MAILJET_API_SECRET,
        fromEmail:parsed.MAILJET_FROM_EMAIL,
        fromName:parsed.MAILJET_FROM_NAME,
    }


}