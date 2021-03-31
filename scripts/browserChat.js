import Login from "./area/login.js";
import Messages from "./area/messages.js";
import Users from "./area/users.js";



export default class BrowserChat {
    constructor() {

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
                this.render.bind(this), this.insert.bind(this)),

            Users: new Users({
                    userList: document.querySelector('[data-role="userList"]'),
                    userThis: document.querySelector('[data-role="userThis"]')
                },
                this.render.bind(this), this.insert.bind(this))
        };


        this.area.Login;
    }


    register(nickname) {
        this.area.Login.fill(this.area.Login.ui.chatLogin);
        setTimeout(() => {
            this.area.Login.hide(this.area.Login.ui.chatLogin);
            this.area.Login.nonone(this.area.Login.ui.chatMain);
            this.area.Login.show(this.area.Login.ui.chatMain);
        }, 400);
        this.area.Users.userThis(nickname);
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
                // вставить html в начало elem
                place.insertAdjacentHTML("afterbegin", item);
            } else if (index === "bottom") {
                // вставить html в конец elem
                place.insertAdjacentHTML("beforeend", item);
            }
        } else {
            console.error("Не передан(ы) параметр(ы)");
        }
    }
}



new BrowserChat();