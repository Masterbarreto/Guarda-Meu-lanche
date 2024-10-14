export const newOrder = async (io, socket) => {
  socket.on("new_order", (data) => {
    io.to(data.restaurant_id).emit("new_order", data);
  });
};

export const acceptedOrder = async (io, socket) => {
  socket.on("accepted_order", (data) => {

    const user_id = data.user_id;
    const order_id = data.order_id;
    io.to(user_id).emit("accepted_order", data);
  });
};

export const refusedOrder = async (io, socket) => {
  socket.on("refused_order", (data) => {

    const user_id = data.user_id;
    const order_id = data.order_id;
    io.to(user_id).emit("refused_order", data);
  });
};

export const readyOrder = async (io, socket) => {
  socket.on("ready_order", (data) => {

    const user_id = data.user_id;
    const order_id = data.order_id;
    io.to(user_id).emit("ready_order", data);
  });
};
