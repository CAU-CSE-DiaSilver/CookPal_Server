const express = require('express')
const app = express();
const router = express.Router()

const search_list = require('./crawling/search_list.js')
const recipe = require('./crawling/recipe.js')

app.set('port', process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({extended :false}));

app.use('/search_list', search_list);
app.use('/recipe', recipe);

app.get('/healthz', (req, res) => {
    res.send('Server On');
})

app.use((req, res, next)=>{
    res.status(404).send('404 Not Found');
});

app.use((err, req, res, next)=>{
    res.send(`${req.status}`);
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});