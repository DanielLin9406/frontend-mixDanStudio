# MixDanStudio 混單工作室

This is my very first website project to front-end side.

![preview](https://i.imgur.com/JKoH6tk.jpg)

## Installation

Install Dependence

```bash
npm i
```

Run Dev

```bash
npm start
```

Build Production

```bash
npm run build
```

## TechStacks

- Webpack 4
- Babel 7
- Pug
- SASS
- jQuery
- ESlint
- Prettier
- Image hosting: AWS S3
- Secret data handler: dotenv

## Enviorment

- Node v10.16
- npm v6.9

## File Structure

- Multiple entry points are in Views folder.
- Components are self-contained.

```bash
├── components
│   ├── fellowsWrap
│   │   ├── _fellowsWrap.scss
│   │   └── fellowsWrap.pug
│   ├── flexCardsWrap
│   │   ├── _flexCardsWrap.scss
│   │   └── flexCardsWrap.pug
│   ├── footer
│   │   ├── _footer.scss
│   │   ├── footer.js
│   │   └── footer.pug
│   ├── header
│   │   ├── _header.scss
│   │   ├── header.js
│   │   └── header.pug
│   ├── iconsWrap
│   │   ├── _iconsWrap.scss
│   │   └── iconsWrap.pug
│   ├── locationFormWrap
│   │   ├── _locationFormWrap.scss
│   │   └── locationFormWrap.pug
│   ├── photoWorksWrap
│   │   ├── _photoWorksWrap.scss
│   │   └── photoWorksWrap.pug
│   ├── serviceBannerWrap
│   │   ├── _serviceBannerWrap.scss
│   │   └── serviceBannerWrap.pug
│   ├── statusWrap
│   │   ├── _statusWrap.scss
│   │   └── statusWrap.pug
│   ├── takeActionWrap
│   │   ├── _takeActionWrap.scss
│   │   └── takeActionWrap.pug
│   ├── topBannerWrap
│   │   ├── _topBannerWrap.scss
│   │   └── topBannerWrap.pug
│   └── webWorksWrap
│       ├── _webWorksWrap.scss
│       └── webWorksWrap.pug
├── layout
│   ├── _base.scss
│   ├── _font.scss
│   ├── _media.scss
│   ├── _mixin.scss
│   ├── _reset.scss
│   ├── _sass-flexbox.scss
│   └── base.pug
├── shared
│   ├── banner.js
│   ├── lettering.min.js
│   ├── mapbox.js
│   ├── photo-work-slider.js
│   ├── ripple.js
│   └── slick-animation.js
└── views
    ├── index
    │   ├── index.js
    │   ├── index.pug
    │   └── index.scss
    └── photowork
        ├── photowork.js
        ├── photowork.pug
        └── photowork.scss
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
