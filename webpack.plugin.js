import glob from 'glob';
import path from 'path';
import fileSystem from 'fs';

function RepalceImagePath() {}

RepalceImagePath.prototype.apply = function(compiler) {
  compiler.plugin('done', function(statsData) {
    var stats = statsData.toJson();
    if (!stats.errors.length) {
      let globPath = './src/views/**/**.pug';
      let htmlFileArr = glob.sync(globPath);
      htmlFileArr.forEach(function(htmlFileFullPath) {
        let htmlPathFileName = path.join(
          __dirname,
          'build',
          htmlFileFullPath
            .split('/')
            .pop()
            .replace('.pug', '.html')
        );
        let html = fileSystem.readFileSync(htmlPathFileName, 'utf8');
        let htmlOutput = html
          .replace(
            /<script\s+src=\.\/vendor\.js/i,
            "<script type='text/javascript' src=" +
              stats.assetsByChunkName.vendor
          )
          .replace(/..\/..\/assets/gi, './static/assets/images');
        fileSystem.writeFileSync(htmlPathFileName, htmlOutput);
      });
    }
  });
};

export default RepalceImagePath;
