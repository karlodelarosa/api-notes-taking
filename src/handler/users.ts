import { NextFunction, Request, Response } from "express";
import { Connection, MysqlError } from 'mysql';
import { Router } from 'express';
import db from "../db/connection";

const router = Router();
const table = 'user'

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
        res.send({
            data: result
        })
    })
})

router.post('/auth', (req: Request, res: Response) => {
    const { name, password } = req.body;
    const query = `SELECT * FROM ${table} WHERE name = ? AND password = ?`
    db.query({
        sql: query,
        values: [name, password]
    }, (err: MysqlError, result: any) => {
        if (err) {
            throw err;
        }
        if (result.length > 0) {
            res.send({
                success: true,
                message: 'User Authenticated'
            });
        } else {
            res.send({
                success: false,
                message: 'Incorrect Username and/or Password!'
            });
        }
    })
})

export default router;