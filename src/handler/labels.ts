import { Request, Response, NextFunction } from "express";
import { MysqlError } from 'mysql';
import { Router } from 'express';
import db from "../db/connection";
import { verifyToken } from "../composable/verifiyToken";

const router = Router();
const table = 'label';

router.get('/', (req: Request, res: Response) => {
    const sql = `SELECT * FROM ${table}`
    db.query(sql, (err: MysqlError, result: any) => {
        if (err) {
            throw err;
          }
        res.send(result)
    })
});

router.get('/note', (req: Request, res: Response) => {
    const query = `SELECT note.id 'note_id', label.id 'label_id', label.name 'label' FROM ${table} INNER JOIN note_label ON label.id = note_label.labelId INNER JOIN note ON note.id = note_label.noteId`;
    
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

router.get('/:id', (req: Request, res: Response) => {
    const query = `SELECT note.id 'note_id', label.id 'label_id', label.name 'label' FROM ${table} INNER JOIN note_label ON label.id = note_label.labelId INNER JOIN note ON note.id = note_label.noteId WHERE note_label.noteId = ?`;
    
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