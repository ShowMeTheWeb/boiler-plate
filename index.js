const express = require('express');
const app = express();
const port = 5000;
const bodyParser = require('body-parser');
const config = require('./config/key');

const {user, User} = require('./models/User');

//bodyParser 가 Client에서 오는 정보를 서버에서 분석할 수 있게 가져옴.

//application/x-www-form-uelencoded 분석해서 가져옴
app.use(bodyParser.urlencoded({extended: true}));
//application/json 분석해서 가져옴
app.use(bodyParser.json());
// app.use()


const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(() => console.log('MongoDB Connected..'))
.catch(err => console.log(err));

app.get('/', (req, res) => res.send('Hello skchoi'));

app.post('/register', (req, res) => {
    // 회원 가입 할때 필요한 정보들을 Client에서 가져오고 DB에 넣어준다.    
    const user = new User(req.body);

    //MongoDB
    user.save((err, userInfo) => {
        if(err) return res.json({success: false, err})
        return res.status(200).json({
            success: true
        })
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

