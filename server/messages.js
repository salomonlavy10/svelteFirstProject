import express from 'express';
import cors from 'cors';
import { addMessage, getMessages } from './database.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/messages', async (req, res) => {
    try {
        const messages = getMessages();
        res.json(messages);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        } else {
            res.status(500).send('An unknown error occurred');
        }
    }
});

app.post('/messages', async (req, res) => {
    try {
        const { content } = req.body;
        addMessage(content);
        res.status(200).json({ success: true });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error.message);
        } else {
            res.status(500).send('An unknown error occurred');
        }
    }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
