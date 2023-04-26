import { Request, Response, NextFunction } from "express";
import { MysqlError } from 'mysql';
import { Router } from 'express';
import db from "../db/connection";
import { verifyToken } from "../composable/verifiyToken";

const router = Router();
const table = 'note_label';

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

router.get('/join', (req: Request, res: Response) => {
    const sql = `SELECT note.id, note.title, note.content, label.name FROM note_label INNER JOIN note ON note.id = note_label.noteId INNER JOIN label ON label.id = note_label.labelId;`;
    db.query(sql, (err: MysqlError, result: any) => {
        if (err) {
            throw err;
          }
        res.send(result)
    })
});

router.get('/join/:id', (req: Request, res: Response) => {
    const sql = `SELECT note.id, note.title, note.content, label.name FROM note_label INNER JOIN note ON note.id = note_label.noteId INNER JOIN label ON label.id = note_label.labelId;`;
    db.query(sql, (err: MysqlError, result: any) => {
        if (err) {
            throw err;
          }
        res.send(result)
    })
});

export default router;