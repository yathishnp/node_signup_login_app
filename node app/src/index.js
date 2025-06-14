const express = require('express');
const bcrypt = require('bcrypt');
const collectionModel = require('./config');
const { hash } = require('crypto');
const port = '3030';

const app = express();
app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({extended : false}));
app.get('/', (req, res)=> {
    res.render('login')
});

app.get('/signup', (req, res)=> {
    res.render('signup')
})

app.post('/signup', async (req, res)=> {
    const data = {
        name: req.body.username,
        password: req.body.password
    }
    const existingUser = await collectionModel.findOne({name: data.name})
    if (existingUser) {
        res.send("user already exist, try another usernanme")
    }
    else {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        data.password = hashedPassword
        const userData = await collectionModel.insertMany(data)
        console.log(userData)
        res.send("user registered successfully")
    }
})

app.post('/login', async (req, res) => {
    try {
        const check = await collectionModel.findOne({name: req.body.username})
        if (!check) {
            res.send("user name not exists, try with correct userName")
        }
        const passwordMatch = await bcrypt.compare(req.body.password, check.password)
        console.log(passwordMatch)
        if (passwordMatch) {
            res.render("home")
        }else {
            res.send("Wrong credentials...")
        }

    }catch (err) {
        res.send("wrong details...")
    }
})
app.listen(port, ()=> {console.log("server running on port:", port)})