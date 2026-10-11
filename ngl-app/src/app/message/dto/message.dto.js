import { Types } from "mongoose";
import { z } from "zod";
export const sendMessage = z.object({
  content: z.string().trim().min(2).max(200),
  receiver: z.string().trim().refine((val) => {
      return Types.ObjectId.isValid(val);
    }),
});
