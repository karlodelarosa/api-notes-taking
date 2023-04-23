import express from "express";
import cors from "cors";
import helmet from "helmet";
import notes from './handler/notes'
import labels from './handler/labels'
import users from './handler/users'

const app = express();
const port = 7000

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/note', notes)
app.use('/label', labels)
app.use('/user', users)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})