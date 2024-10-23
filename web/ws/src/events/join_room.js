export const joinRoom = async (io, socket) => {

  if (socket.credentials.role == "restaurant") {
    socket.on("join_restaurant_room", (room_id) => {
      socket.join(room_id);
      console.log(`lanchonete conectada à sala: ${room_id}`);
    });
  }
  
  socket.on("join_user_room", (room_id) => {
    socket.join(room_id);
    console.log(`user conectada à sala: ${room_id}`);
  });
};
