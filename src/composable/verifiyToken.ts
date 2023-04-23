import * as dotenv from "dotenv";
dotenv.config();

export const verifyToken = (reqToken: string) => {
    return reqToken === process.env.TOKEN_SECRET;
}