const render = require('./header.art');
const data = {
    title: 'My Page'
};
const html = render(data);

if (typeof document === 'object') {
    document.body.innerHTML = html;
}

module.exports = "header";