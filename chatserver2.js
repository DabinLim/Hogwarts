const WebSocketS = require("ws").Server;

class Server {
    clients = [];
    wss = null;
    server = null;
  
start(port) {
      this.wss = new WebSocketS({ port: port });  // 내가 설정한 port로 websocket 서버를 연다
      console.log("WebSocket Initialized", port);
  
      //웹소켓 연결 핸들러, 연결이 되면 진행됨!
      this.wss.on("connection", (ws) => {
        this.clients.push(ws);
        console.log("Connected total:", this.clients.length);
  
        //메세지 핸들러,클라이언트가 메세지를 보내게되면 여기서 받는다.
        ws.on("message", (message) => {
          console.log("received: %s", message);
        //   ws.emit('message', message);
        });
      });
      this.wss.on("close", function (error) {
        console.log("websever close", error);
      });
      this.wss.on("error", function (error) {
        console.log(error);
      });
    }
  }
   
  

  
  const server = new Server();
  
  server.start(3001);