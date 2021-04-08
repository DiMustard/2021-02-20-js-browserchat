export default class UserList {
    constructor(ui, render, insert) {
        this.ui = ui;
        this.render = render;
        this.insert = insert;
        this.userCurr = "Текущий юзер не установлен";
    }


    getNick() {
        return this.userCurr;
    }


    userNew(nickname, place, index) {
        let user = this.render("user", {
            nickname: nickname
        });
        this.insert(user, place, index);
    }


    userThis(nickname) {
        this.userNew(nickname, this.ui.userThis, "top");
        let userCurr = document.querySelector(`[data-user=${nickname}]`);
        userCurr.setAttribute("data-role", "current-user");
        this.userCurr = nickname;
    }


    userOther(nickname) {
        if (nickname !== this.userCurr) {
            this.userNew(nickname, this.ui.userList, "top");
        }
    }


    userRemove(nickname) {
        if (nickname !== this.userCurr) {
            let users = this.ui.userList;
            let user = users.querySelector(`[data-user="${nickname}"]`);
            users.removeChild(user);
        }
    }
}