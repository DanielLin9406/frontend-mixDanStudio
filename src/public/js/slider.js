
// Module is the global scope variable inside a file;
// There is also another global object called 'global' which you can write and read from in any file you want, but that involves mutating global scope and this is 'EVIL'.
// 'Exports' is a variable that lives on module.exports. It's basically what you export when a file is required.
// module.exports is the object that's actually returned as the result of a require call.

// module.exports = {
//     default: {
//         wrap: document.querySelector('.banner'),
//         items: document.querySelector('.banner_slider ul'),
//         itemCount: document.querySelectorAll('.banner_slider ul li').length,
//         scroller: document.querySelector('.banner_slider'),
//         pos: 0,
//     },
//     next: function () {
//         this.default.pos = Math.min(this.default.pos + 1, this.default.itemCount - 1);
//         this.setTransform();
//     },
//     prev: function () {
//         this.default.pos = Math.max(this.default.pos - 1, 0);
//         this.setTransform();
//     },
//     setTransform: function () {
//         this.default.items.style['transform'] = 'translate3d(' + (-this.default.pos * this.default.items.offsetWidth) + 'px,0,0)';
//     }
// };