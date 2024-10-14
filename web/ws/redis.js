import { io } from "socket.io-client";

const restaurant_socket = io("http://localhost:3000");

restaurant_socket.auth = {
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuYW1lIjoiUm9zcXVpbmhhcy5jb20iLCJyb2xlIjoicmVzdGF1cmFudCIsImFyZWFfaWQiOjEsImlhdCI6MTcyNzk4MzM0OCwiZXhwIjoxNzM1NzU5MzQ4fQ.aWOnYv0cmlr9_RrE8uV_8DD_i-RR_82GTOosTVHm59w",
};

restaurant_socket.on("connect", () => {
  console.log("client da lanchonete conectado.");

  restaurant_socket.emit("join_restaurant_room", 1);
});

restaurant_socket.on("new_order", (order) => {
  restaurant_socket.emit("accepted_order", {order_id:1, user_id:3});
});

