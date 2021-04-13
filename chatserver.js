

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const portNo = 3001
const io = require('socket.io')(server,{
    cors: {
        origin: "*",
        methods:["GET","POST"],
    }
});
const cors = require('cors');
const corsOptions = {
    origin: "*",
    credentials: true
  }
  


app.use(cors(corsOptions))
app.get('/', (req, res) => {
    res.send('안녕 내 이름은 서버!')
})


io.on('connection', (socket) => {
    console.log('클라이언트 접속:' , socket.client.id)

    socket.on('chat-msg', (msg) => {
        console.log('message:' , msg)
        io.emit('chat-msg', msg)
    })

})

server.listen(portNo, () => {
    console.log('서버가 준비되었습니다.', 'http://localhost:'+ portNo);
})