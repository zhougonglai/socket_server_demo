const app = require("./src");
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');

app.use(cors())
app.use(bodyParser.json());

const PORT = config.PORT || 3000;

let userNum = 0;

const authNSP = io.of('/auth').on('connection', require('./src/auth'));
const roomNSP = io.of('/room').on('connection', require('./src/room'));



io.on("connection", socket => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    --userNum;
    console.log("user disconnected");
    socket.broadcast.emit('user left', {
      username: socket.username,
      userNum
    })
  });

  socket.on("chat message", ctx => {
    console.log("message: ", ctx);
    socket.broadcast.emit('chat message', {
      username: socket.username,
      message: ctx
    })
  });

  socket.on('add user', username => {
    userNum++;
    socket.emit('login', {
      userNum
    })

    socket.broadcast.emit('user joined', {
      username: socket.username,
      userNum
    })
  })

  socket.on('typing', () => {
    console.log('typing')
  });
});

http.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
