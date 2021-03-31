export default class UserList {
    constructor(ui, render, insert) {
        this.ui = ui;
        this.render = render;
        this.insert = insert;
        this.userCurr = "Текущий юзер не установлен";
    }

    userThis(nickname) {
        this.newUser(nickname, this.ui.userThis, "top");
        this.userCurr = document.querySelector(`[data-user=${nickname}]`);
        this.userCurr.setAttribute("data-role", "current-user");
    }

    userOther(nickname) {
        this.newUser(nickname, this.ui.userList, "bottom");
    }

    newUser(nickname, place, index) {
        let user = this.render("user", {
            nickname: nickname
        });
        this.insert(user, place, index);
    }
}