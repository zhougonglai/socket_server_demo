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

// io.attach(http);

io.on("connection", socket => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat message", (msg) => {
    console.log("message: ", msg);
  });

  socket.on('reply', () => {
    console.log('reply')
  });
});

http.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
