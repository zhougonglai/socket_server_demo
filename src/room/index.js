module.exports = socket => {
  const roomNSP = socket.nsp;
  console.log("join room");
  roomNSP.emit(`${socket.nsp}`);
}

