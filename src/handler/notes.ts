import { NextFunction, Request, Response } from "express";
import { Connection, MysqlError } from 'mysql';
import { Router } from 'express';
import db from "../db/connection";
import { verifyToken } from "../composable/verifiyToken";

const router = Router();
const table = 'note'

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
  const sql = `SELECT * FROM ${table} ORDER BY createdAt DESC`
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

router.get('/label/:id', (req: Request, res: Response) => {

  const toArray = req.params.id.split(',')
  let placeholder = ''

  toArray.forEach((value, index) => {
    placeholder += "?,"
  })

  const trimmed = placeholder.slice(0, -1)

  const query = `SELECT DISTINCT note.* FROM ${table} LEFT JOIN note_label ON note.id = note_label.noteId LEFT JOIN label ON label.id = note_label.labelId WHERE note_label.labelId IN (${trimmed}) ORDER BY note.id DESC`

  db.query({
    sql: query,
    values: toArray
  }, (err: MysqlError, result: any) => {
    if (err) {
      throw err;
    }
    res.send(result)
  })
})

router.post('/add', ensureToken, (req: Request, res: Response) => {
  // const { title, content } = req.body
  const { data } = req.body
  const isAllowed = verifyToken(req.token)
  const parsed = JSON.parse(data)

  if (isAllowed) {
    const query = `INSERT INTO ${table} (title, content) VALUES (?, ?)`
    db.query({
      sql: query,
      values: [parsed.title, parsed.content]
    }, (err: MysqlError, results: any) => {
      const lastInsertedId = results.insertId
      const isEmptyLabel = parsed.labelIds.length <= 0
      let sqlString = ''

      if (isEmptyLabel) {
        if (err) {
          throw err;
        }
        res.send({
          success: true,
          message: 'Note successfully added!'
        });
      } else {
        parsed.labelIds.forEach((id: number) => {
          sqlString += `(${lastInsertedId}, ${id}),`
        })
        const query2 = `INSERT INTO note_label (noteId, labelId) VALUES ${sqlString.slice(0, -1)}`
        db.query(query2, (err: MysqlError, result: any) => {
          if (err) {
            throw err;
          }
          res.send({
            success: true,
            message: 'Note and Label successfully added!'
          });
        })
      }


      // res.send({
      //     success: true,
      //     message: 'Note successfully added!'
      // });
    })
  } else {
    res.sendStatus(403)
  }
})

router.put('/:id', ensureToken, (req: Request, res: Response) => {
  const { title, content, id } = req.body
  const isAllowed = verifyToken(req.token)

  if (isAllowed) {
    const query = `UPDATE ${table} SET title = ?, content = ? WHERE id = ?`;
    db.query({
      sql: query,
      values: [title, content, id]
    }, (err: MysqlError, result: any) => {
      if (err) {
        throw err;
      }
      res.send({
        success: true,
        message: 'Note successfully updated!'
      });
    })
  } else {
    res.sendStatus(403)
  }
})

router.delete('/:id', ensureToken, (req: Request, res: Response) => {
  const { id } = req.params
  const isAllowed = verifyToken(req.token)

  if (isAllowed) {
    const query = `DELETE from ${table} WHERE id = ?`;
    const query2 = `DELETE from note_label WHERE noteId = ?`
    db.query({
      sql: query,
      values: [id]
    }, (err: MysqlError, result: any) => {
      if (err) {
        throw err;
      }
      db.query({
        sql: query2,
        values: [id]
      })
      res.send({
        success: true,
        message: 'Note successfully deleted!'
      });
    })

  } else {
    res.sendStatus(403)
  }
})

export default router;