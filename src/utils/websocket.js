import { htmlActions } from "./htmlActions.js";

export function setupWebSocket(userId) {
  const socket = new WebSocket("ws://localhost:3500");
  socket.addEventListener("open", () => {
    console.log("🔌 WebSocket conectado");
    socket.send(
      JSON.stringify({
        type: "identify",
        userId,
      })
    );
  });

  socket.addEventListener("message", async (event) => {
    const msg = JSON.parse(event.data);
    const taskEvents = new Set([
      "task-created",
      "task-updated",
      "task-deleted",
      "event-created",
      "event-updated",
      "event-deleted",
    ]);

    if (taskEvents.has(msg.event)) {
      htmlActions.showNotification(msg.data.message);
    }
  });
}
