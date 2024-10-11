import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

socket.auth = {
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMiLCJlbWFpbCI6InZlbGFzcXVlcy5yaWNhcmRvQGlnLmNvbS5iciIsImNwZiI6IjgzMTExNTA1ODM5Iiwicm9sZSI6InVzZXIiLCJ2ZXJpZmllZCI6ZmFsc2UsImNvZGUiOiI4ODUzTCIsImlhdCI6MTcyNzczODkzMiwiZXhwIjoxNzM1NTE0OTMyfQ.aApBRH4b8D2yR_1BY8J0_WeWGmnTU_cbjIV52ub8oBw",
};

const order = {
  id: "6",
  status: "created",
  order_date: "2024-10-03 19:22:48.11292-03",
  total_price: "21.98",
  restaurant_id: 1,
  items: [
    {
      name: "Farofa",
      price: "10.99",
      quantity: 2,
      desc: "Farofa",
      url: "https://loremflickr.com/cache/resized/65535_53071490565_87efdd9242_z_640_480_nofilter.jpg",
    },
  ],
};
socket.on("connect", () => {
  console.log("client da api conectado.");
  socket.emit("join_user_room",3)
});

socket.emit("new_order", order);


socket.on("accepted_order", (order) => {
  console.log(order,55);
});




socket.on("connect_error", (error) => {
  console.error("Erro de conexão:", error);
});

socket.on("disconnect", () => {
  console.log("Desconectado do servidor.");
});
