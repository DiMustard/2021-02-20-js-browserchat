export default {
    getNick() {
        let input = document.querySelector(".input-nickname");
        return input.value;
    },

    getMessage() {
        let input = document.querySelector(".input-message");
        return input.value;
    },

    getTime() {
        let now = new Date();
        return `${now.getHours()}:${now.getMinutes()}`;
    }
}