if (module.hot) {
    // hack, 讓 pug 也能夠自動 reload
    require('!raw-loader!./index.pug');
    console.log("aa");
}