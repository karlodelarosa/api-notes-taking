import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import cors from "cors";
import helmet from "helmet";
import notes from './handler/notes'
import labels from './handler/labels'
import users from './handler/users'
import note_labels from './handler/note_labels';

const app = express();
const port = 7000

app.use(helmet());
app.use(cors({
    origin: ['https://app-notes-taking.pages.dev/']
}));
app.use(express.json());

app.use('/note', notes)
app.use('/label', labels)
app.use('/user', users)
app.use('/note-label', note_labels)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})