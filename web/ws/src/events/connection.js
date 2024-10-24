import { joinRoom } from "./join_room.js";
import { newOrder, acceptedOrder } from "./new_order.js";

const handleEvents = (evt, io, socket) => {
  for (let i = 0; i < evt.length; i++) {
    evt[i](io, socket);
  }
};
const evt = [];
evt.push(joinRoom, newOrder,acceptedOrder);
export const connection = (io, socket) => {
  handleEvents(evt, io, socket);
  //   joinRoom(io, socket);
  //   newOrder(io, socket);
  //   updateOrder(io, socket);

  socket.on("disconnect", () => {
    console.log("cliente desconectado:", socket.id);
  });
};
