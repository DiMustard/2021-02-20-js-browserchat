export default class WSClient {
    constructor(url, typiser) {
        this.url = url;
        this.typiser = typiser;
    }


    connect() {
        return new Promise(resolve => {
            this.socket = new WebSocket(this.url);

            this.socket.addEventListener("open", resolve);
            this.socket.addEventListener("message", e => {
                this.typiser(JSON.parse(e.data));
            });
            this.socket.addEventListener("close", e => {
                console.log(`Сервер закрыт из-за ошибки ${e.code}`);
            });
        });
    }


    sendHello(name) {
        this.sendMessage("hello", {
            name
        });
    }


    sendTextMessage(message) {
        this.sendMessage("text-message", {
            message
        });
    }


    sendMessage(type, data) {
        this.socket.send(
            JSON.stringify({
                type,
                data,
            })
        );
    }
}