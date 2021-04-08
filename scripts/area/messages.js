export default class Messages {
    constructor(ui, render, insert, sendler) {
        this.ui = ui;
        this.render = render;
        this.insert = insert;
        this.sendler = sendler;

        this.listener();
    }


    listener() {
        this.ui.input.addEventListener("keydown", e => {
            if (e.key === "Enter") this.ui.button.click();
        });
        this.ui.button.addEventListener("click", e => {
            let message = this.ui.input.value.trim();
            if (message) this.sendler(message);
        });
    }


    clear() {
        this.ui.input.value = "";
        this.ui.input.focus();
    }


    getTime() {
        let date = new Date();
        let hour = String(date.getHours()).padStart(2, 0);
        let mins = String(date.getMinutes()).padStart(2, 0);
        let now = `${hour}:${mins}`;
        return now;
    }


    addMessage(nickname, message) {
        let newMessage = this.render("message", {
            nickname: this.sanitize(nickname),
            time: this.getTime(),
            message: this.sanitize(message)
        });
        this.insert(newMessage, this.ui.messList, "bottom");
        this.ui.messList.scrollTop = this.ui.messList.scrollHeight;
    }


    addSystem(nickname, did) {
        let newMessage = this.render("system", {
            nickname: this.sanitize(nickname),
            did: did
        });
        this.insert(newMessage, this.ui.messList, "bottom");
        this.ui.messList.scrollTop = this.ui.messList.scrollHeight;
    }


    sanitize(string) {
        const UNSAFE_CHARS_RE = /<|>\/|'|\u2028|\u2029/g;

        const ESCAPED_CHARS = {
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '\\u0027',
            '</': '<\\u002F',
            '\u2028': '\\u2028',
            '\u2029': '\\u2029',
        };

        const escapeUnsafeChars = (unsafeChar) => ESCAPED_CHARS[unsafeChar];
        return string.replace(UNSAFE_CHARS_RE, escapeUnsafeChars);
    }
}