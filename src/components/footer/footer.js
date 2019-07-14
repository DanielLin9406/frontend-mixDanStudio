if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
    require('!raw-loader!./footer.pug');
  }
}

module.exports = 'footer';
// const render = require('../html/footer.art');
// const data = {
//     title: 'My Page'
// };
// const html = render(data);
// const footer_wrap = document.querySelector('.footer_wrap');

// if (typeof document === 'object') {
//     footer_wrap.innerHTML = html;
// }
