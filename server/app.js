const express = require('express');
const mongoose = require('mongoose');
// const authMiddleware = require('./middlewares/auth-middleware');
const User = require('./models/user');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const auth_middleware = require('./middlewares/auth_middleware');
  


mongoose.connect('mongodb://localhost/hogwarts', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

const app = express();
const router = express.Router();

const corsOptions = {
    origin: "*",
    credentials: true
  }

app.use(cors(corsOptions))
app.use(express.json());
app.use('/api', express.urlencoded({ extended: false }), router);

router.post('/register', async (req, res) => {
    const { nickname, email, password } = req.body;

    const existUsers = await User.find({
        $or: [{ email }, { nickname }],
    });

    if(existUsers.length) {
        res.status(401).send({
            errorMessage: '이미 가입된 이메일 또는 닉네임이 있습니다.'
        });
        return
    };
    const profile_img = 'https://user-images.githubusercontent.com/77574867/115653243-ca8c0680-a369-11eb-82fa-b2230218fa34.png';
    const user_house = null;
    const user_wand = null;
    const user_patronus = null;
    const user = new User({ email, nickname, password, profile_img, user_house, user_wand, user_patronus })
    await user.save();

    res.status(201).send({});

});

app.listen(8080, () => {
    console.log('서버가 요청을 받을 준비가 됐어요');
});

router.post('/auth', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email, password }).exec();

    if(!user) {

        res.status(401).send({
            errorMessage: '존재하지 않는 이메일이거나 이메일 또는 비밀번호가 일치하지 않습니다.'
        });
        return
    };

    const token = jwt.sign({ userId: user.userId }, 'dab-secret-key');
    console.log(user)
    res.send({
        email: user.email,
        nickname: user.nickname,
        profile_img: user.profile_img,
        user_house: user.user_house,
        user_wand: user.user_wand,
        user_patronus: user.user_patronus,
        token
    })

});

router.get('/logincheck', auth_middleware, (req,res) => {
    const { user } = res.locals;
    res.send({
        user
    })
});

router.put('/edithouse', auth_middleware, async (req, res) => {
    const { user } = res.locals;
    const { new_house } = req.body
    user.user_house = new_house;
    console.log(user)
    await user.save();

    res.send({ message:'성공적으로 변경되었습니다.' })
})

router.get('/students/:house', auth_middleware, async (req, res) => {
    const { house } = req.params;
    
    const students = await User.find({
        user_house:house
    }).exec();

    console.log(students);

    res.send({
        students
    });
})