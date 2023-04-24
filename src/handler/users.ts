import { Request, Response, NextFunction } from "express";
import { MysqlError } from 'mysql';
import { Router } from 'express';
import * as dotenv from "dotenv";

import db from "../db/connection";
import { verifyToken } from "../composable/verifiyToken";

dotenv.config();

const router = Router();
const table = 'user'

const ensureToken = (req: Request, res: Response, next: NextFunction) => {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader?.split(" ")
        const bearerToken = bearer[1]
        req.token = bearerToken
        next();
    } else {
        res.sendStatus(403)
    }
}

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

router.post('/auth', ensureToken, (req: Request, res: Response, next: NextFunction) => {
    const { name, password } = req.body;
    const isAllowed = verifyToken(req.token)

    console.info(password)

    if (isAllowed) {
        const query = `SELECT name FROM ${table} WHERE name = ? AND password = ?`
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
                    message: 'User Authenticated',
                    data: result
                });
            } else {
                res.send({
                    success: false,
                    message: 'Incorrect credentials. Please try again.'
                });
            }
        })
    } else {
        res.sendStatus(403)
    }
    
})

export default router;