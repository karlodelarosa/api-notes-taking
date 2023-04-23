import { NextFunction, Request, Response } from "express";
import { Connection, MysqlError } from 'mysql';
import { Router } from 'express';
import db from "../db/connection";

const router = Router();
const table = 'note'

router.get('/', (req: Request, res: Response) => {
    const sql = `SELECT * FROM ${table}`
    db.query(sql, (err: MysqlError, result: any) => {
        if (err) {
            throw err;
          }
        res.send(result)
    })
});

router.get('/:id', (req: Request, res: Response) => {
    const query = `SELECT * FROM ${table} WHERE id = ?`
    db.query({
        sql: query,
        values: [req.params.id]
    }, (err: MysqlError, result: any) => {
        if (err) {
            throw err;
          }
        res.send(result)
    })
})

export default router;