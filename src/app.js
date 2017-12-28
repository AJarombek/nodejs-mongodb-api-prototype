// Author: Andrew Jarombek
// Date: 12/27/2017

const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('{}');
});

app.listen(port, () => {
    console.info(`Started API on port ${port}`);
});