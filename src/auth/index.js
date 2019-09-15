let namespace;

const users = {
  general: [],
  sports: [],
  games: []
}

module.exports = socket => {
  namespace = socket.nsp;

  socket.on('joinRoom', ({ username, room }) => {
    socket.join(room, () => {
      users[room].push({ username, privateChat: false })
      namespace.in(room).emit('newUser', users[room])
    })
  })
}
