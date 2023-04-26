export const verifyToken = (reqToken: string) => {
    return reqToken === process.env.TOKEN_SECRET;
}