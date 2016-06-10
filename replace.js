const fs = require('fs');
const glob = require('glob');

const nativeRegExp = /\.native\.jsx?$/;

glob.sync('./src/**/*.js?(x)').forEach(file => {
    if (file.match(nativeRegExp)) {
        const iosJsFile = file.replace(nativeRegExp, '.ios.js'),
            androidJsFile = file.replace(nativeRegExp, '.android.js');
        fs.renameSync(file, iosJsFile);
        fs.createReadStream(iosJsFile).pipe(fs.createWriteStream(androidJsFile));
    } else if (file.endsWith('x')) {
        fs.renameSync(file, file.substr(0, file.length - 1));
    }
});
