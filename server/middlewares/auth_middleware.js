const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = (req, res, next) => {
    // header의 authorization 안에 들어있는 토큰값 가져오기
    const { authorization } = req.headers;

    try {
        // 토큰안의 정보 userId를 이용하여 유저정보 가져오기
        const { userId } = jwt.verify(authorization, 'dab-secret-key');
        User.findById(userId).exec().then((user) => {
            res.locals.user = user;
            next();
        });
        // 실패시 에러 전송
    } catch (error) {
            res.status(401).send({
                errorMessage: '로그인 후 사용하세요',
            });
            return;
    }

}