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

app.use(express.static(path.join(__dirname, '../dist')));

io.attach(http);

io.on("connection", socket => {
  console.log("a user connected");
  socket.on("disconnect", function() {
    console.log("user disconnected");
  });

  socket.on("chat message", function(msg) {
    console.log("message: ", msg);
  });
});

http.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
