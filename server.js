import express from 'express';
import path from 'path';

const __dirname = path.resolve();
const app = express();
const PORT = 3000;

app.use(express.static(__dirname + '/dist'));

app.listen(PORT, function () {
    console.log(`App listening on port ${PORT}!`);
});
