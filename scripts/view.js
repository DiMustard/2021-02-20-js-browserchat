export default {
    render(object, data) {
        object += "-template";
        let template = document.getElementById(object);
        let handlebarsFunction = Handlebars.compile(template.innerHTML);
        return handlebarsFunction(data);
    }
}