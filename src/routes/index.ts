// import { NextFunction, Request, Response } from "express";
// import { Connection, MysqlError } from 'mysql';
// import { Router } from 'express';
// import db from "../db/connection";

// const router = Router();

// router.get('/', (req: Request, res: Response) => {
//     const sql = "SELECT * FROM note"
//     db.query(sql, (err: MysqlError, result: any) => {
//         if (err) {
//             throw err;
//           }
//         res.send(result)
//     })
// });

// export default router;