export default class UserList {
    constructor(ui, render, insert, loader) {
        this.ui = ui;
        this.render = render;
        this.insert = insert;
        this.loader = loader;
        this.userCurr = {
            name: "Пользователь не установлен",
            photo: 0
        };
    }


    listener() {
        let userPhoto = document.querySelector('[data-role="current-photo"]');


        userPhoto.addEventListener("dragover", e => {
            if (e.dataTransfer.items.length &&
                e.dataTransfer.items[0].kind === "file")
                e.preventDefault();
        });


        userPhoto.addEventListener("drop", e => {
            const file = e.dataTransfer.items[0].getAsFile();
            const reader = new FileReader();

            reader.readAsDataURL(file);
            reader.addEventListener("load", () => {
                this.userCurr["photo"] = reader.result;
                this.loader(this.userCurr["photo"]);
            });
            e.preventDefault();
        });
    }


    getNick() {
        return this.userCurr["name"];
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
        userCurr.querySelector(".user-avatar").setAttribute("data-role", "current-photo");
        this.userCurr["name"] = nickname;
        this.listener();
    }



    userPhoto(photo) {
        let img = document.querySelector('[data-role="current-photo"]');
        img.setAttribute("src", photo)
    }


    userOther(nickname) {
        if (nickname !== this.userCurr["name"]) {
            this.userNew(nickname, this.ui.userList, "top");
        }
    }


    userRemove(nickname) {
        if (nickname !== this.userCurr["name"]) {
            let users = this.ui.userList;
            let user = users.querySelector(`[data-user="${nickname}"]`);
            users.removeChild(user);
        }
    }
}