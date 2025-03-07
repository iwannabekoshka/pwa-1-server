const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 3000;

const FILE_PATH = path.join(__dirname, 'trials.csv');

app.use(cors());
app.use(express.text()); // Middleware для обработки текстового тела запроса
app.use(express.json());  // Добавляем поддержку JSON
app.use(express.urlencoded({ extended: true }));  // Для работы с формами

// Эндпоинт для чтения trials.csv
app.get('/trials', (req, res) => {
    fs.readFile(FILE_PATH, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Ошибка при чтении файла');
        }
        res.send(data);
    });
});

// Эндпоинт для записи в trials.csv
app.post('/trials', (req, res) => {
    const newData = JSON.stringify(req.body);
    if (!newData) {
        return res.status(400).send('Пустые данные');
    }
    fs.appendFile(FILE_PATH, `\n${newData}`, (err) => {
        if (err) {
            return res.status(500).send('Ошибка при записи файла');
        }
        res.send('Данные добавлены');
    });
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
