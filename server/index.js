const express = require('express');

const app = express();
app.set('port', process.env.PORT || 3010);

app.get('/', (req, res) => {
    res.send('서버 실행 성공!');
});

app.listen(app.get('port'), ()=> {
    console.log(app.get('port'), '콘솔 출력');
});

