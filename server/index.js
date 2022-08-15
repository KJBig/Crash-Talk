const express = require('express');

const app = express();
app.set('port', process.env.PORT || 5555);

app.get('/', (req, res) => {
    res.send('서버 실행 성공!');
});

