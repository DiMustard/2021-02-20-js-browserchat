let socket = new WebSocket("ws://localhost:7777/ws");

document.getElementById("submit").addEventListener("click", e => {
    let message = document.getElementById("message").value;
    socket.send(message);
    return false;
})

socket.onmessage = function (event) {
    let message = event.data;
    let element = document.createElement("div");
    element.classList.add("mess");
    element.textContent = message;
    document.getElementById("messages").prepend(element);
};

socket.onclose = event => console.log(`Closed ${event.code}`);