export default class Login {
    constructor(ui, register) {
        this.ui = ui;
        this.register = register;

        this.listener();
    }


    listener() {
        this.ui.input.addEventListener("keydown", e => {
            if (e.key === "Enter") this.getNick()
        });
        this.ui.button.addEventListener("click", e => {
            this.getNick()
        });
    }


    getNick() {
        let nickname = this.ui.input.value;
        if (nickname) 
            this.register(nickname.trim());
    }


    fill(e) {
        e.classList.add("animate__fillAll");
    }

    hide(e) {
        e.classList.add("animate__fadeOut");
        e.classList.remove("animate__fadeIn");
    }

    nonone(e) {
        e.classList.remove("none");
    }

    show(e) {
        e.classList.add("animate__fadeIn");
        e.classList.remove("animate__fadeOut");
    }
}