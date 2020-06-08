const express = require('express');
const morgan = require('morgan');
const app = express();

// Settings
app.set('appName', 'FAST-EXPRESS TUT');
app.set('appPort', 3000);
app.set('view engine', 'ejs');

// Middlewares
app.use(express.json());
app.use(morgan('dev'));

// Rutas

app.get('/', (req, res) => {
    const data = [{name:'john'}, {name:'joe'}, {name:'yep'}];
    res.render('index.ejs', {people: data});
});
app.all('/user', (req, res, next) => {
    console.log('on my way');
    next();
});

app.get('/user', (req, res) => {
    //res.send('Hello world');
    const user = {
        userName: 'John',
        lastName: 'Doe'
    };
    res.json(user);
});

app.post('/user/:id', (req, res) => {
    console.log(req.body);
    console.log(req.params);
    res.send('ruta');
});

app.use(express.static('public'));

app.listen(app.get('appPort'), () => {
    console.log(app.get('appName'));
    console.log('Serve on port', app.get('appPort'));
});