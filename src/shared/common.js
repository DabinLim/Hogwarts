export const idCheck = (id) => {
    
    let _reg = /^[A-za-z0-9]{5,15}$/g;
    return _reg.test(id);
}

export const pwdCheck = (pwd) => {
    let _reg = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/

    return _reg.test(pwd)
}

export const nameCheck = (name) => {
    let _reg = /^[ㄱ-ㅎ|가-힣|a-z|A-Z]{2,10}$/;

    return _reg.test(name)
}

export const emailCheck = (email) => {
    // ^ (첫글자) 0-9까지 a-z까지 A-Z까지 , ([-_.의 특수문자 및 숫자 알파벳 여러개])*
    let _reg = /^[0-9a-zA-Z]([-_.0-9a-zA-Z])*@[0-9a-zA-Z]([-_.0-9a-zA-Z])*.([a-zA-Z])*/;
    return _reg.test(email);
}