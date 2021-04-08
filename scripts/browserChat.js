import Login from "./area/login.js";
import Messages from "./area/messages.js";
import Users from "./area/users.js";
import WSClient from "./wsClient.js";



export default class BrowserChat {
    constructor() {
        this.WSClient = new WSClient("ws://localhost:7777/ws", this.typiser.bind(this));


        this.area = {
            Login: new Login({
                    chatLogin: document.querySelector('[data-role="chatLogin"]'),
                    chatMain: document.querySelector('[data-role="chatMain"]'),
                    input: document.querySelector(".input-nickname"),
                    button: document.querySelector(".enter-nickname"),
                },
                this.register.bind(this)),

            Messages: new Messages({
                    messList: document.querySelector('[data-role="messList"]'),
                    messSend: document.querySelector('[data-role="messSend"]'),
                    input: document.querySelector(".input-message"),
                    button: document.querySelector(".enter-message"),
                },
                this.render.bind(this), this.insert.bind(this), this.sendler.bind(this)),

            Users: new Users({
                    userList: document.querySelector('[data-role="userList"]'),
                    userThis: document.querySelector('[data-role="userThis"]')
                },
                this.render.bind(this), this.insert.bind(this))
        };


        this.area.Login;
    }


    async register(nickname) {
        if (nickname) {
            await this.WSClient.connect();
            this.WSClient.sendHello(nickname);

            this.area.Login.fill(this.area.Login.ui.chatLogin);
            setTimeout(() => {
                this.area.Login.hide(this.area.Login.ui.chatLogin);
                this.area.Login.nonone(this.area.Login.ui.chatMain);
                this.area.Login.show(this.area.Login.ui.chatMain);
            }, 400);
            this.area.Users.userThis(nickname);

        } else {
            console.error("Не передан параметр");
        }
    }


    sendler(message) {
        this.WSClient.sendTextMessage(message);
        this.area.Messages.clear();
    }


    typiser({
        type,
        from,
        data
    }) {
        console.log(type, from, data);

        if (type === "hello") {
            this.area.Users.userOther(from);
            this.area.Messages.addSystem(from, "вошел в чат");

        } else if (type === "user-list") {
            for (const item of data) {
                this.area.Users.userOther(item);
            }

        } else if (type === "bye-bye") {
            this.area.Users.userRemove(from);
            this.area.Messages.addSystem(from, "вышел из чата`");

        } else if (type === "text-message") {
            this.area.Messages.addMessage(from, data.message);
        }
    }


    render(object, data) {
        if (object && data) {
            object += "-template";
            let template = document.getElementById(object);
            let handlebarsFunction = Handlebars.compile(template.innerHTML);
            return handlebarsFunction(data);
        } else {
            console.error("Не передан(ы) параметр(ы)");
        }
    }


    insert(item, place, index) {
        if (item && place && index) {
            if (index === "top") {
                // вставить html в начало place
                place.insertAdjacentHTML("afterbegin", item);
            } else if (index === "bottom") {
                // вставить html в конец place
                place.insertAdjacentHTML("beforeend", item);
            }
        } else {
            console.error("Не передан(ы) параметр(ы)");
        }
    }
}



new BrowserChat();