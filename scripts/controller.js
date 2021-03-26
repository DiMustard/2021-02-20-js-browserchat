import M from './model.js';
import V from './view.js';

export default {
    enter() {
        let nickname = M.getNick();

        if (nickname) {
            let parent = document.querySelector(".all-users");
            let child = this.getUser(nickname);

            this.insert(child, parent)

            let login = document.querySelector(".login");
            let main = document.querySelector(".main");

            main.classList.remove("none");
            login.classList.add("animate__fadeOut");
            main.classList.add("animate__fadeIn");
        }
    },


    getUser(nickname) {
        return V.render("user", {
            nickname: nickname
        });
    },


    getMessage() {
        return V.render("message", {
            nickname: M.getNick(),
            time: M.getTime(),
            message: M.getMessage(),
        });
    },


    insert(item, place) {
        place.insertAdjacentHTML("afterbegin", item);
    }
}