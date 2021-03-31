export default class Messages {
    constructor(ui, render, insert) {
        this.ui = ui;
        this.render = render;
        this.insert = insert;
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