// ------------------------------------ //
// --------- Settings & Paths --------- //
// ------------------------------------ //

const rootPath       = '.';
const srcPath        = rootPath  + '/assets';
const buildPath      = rootPath  + '/build';
const styleguidePath = rootPath  + '/build/styleguide';

module.exports = {
    settings: {
        styles            : true,
        scripts           : true,
        standaloneScripts : true,
        svgIcons          : true,
        svgSprite         : true,
        images            : true,
        fonts             : true
    },
    paths: {
        build      : buildPath,
        styleguide : styleguidePath
    },
    styles: {
        src        : srcPath        + '/styles/**/*.+(sass|scss)',
        build      : buildPath      + '/css',
        styleguide : styleguidePath + '/css',
        filename   : 'styles.min.css'
    },
    scripts: {
        src: {
            standalones : srcPath   + '/scripts/standalones/**/*.js',
            concat      : [
                srcPath       + '/scripts/vendors/**/*.js',
                srcPath       + '/scripts/custom/**/*.js',
                '!' + srcPath + '/scripts/standalones/**/*.js'
            ]
        },
        build      : buildPath      + '/js',
        styleguide : styleguidePath + '/js',
        filename   : 'scripts.js',
        suffix     : '.min'
    },
    fonts: {
        src        : srcPath        + '/fonts/**/*.+(eot|svg|ttf|woff|woff2)',
        build      : buildPath      + '/fonts',
        styleguide : styleguidePath + '/fonts'
    },
    images: {
        src        : srcPath        + '/images/**/*.+(png|jpg|jpeg|gif|svg)',
        build      : buildPath      + '/img',
        styleguide : styleguidePath + '/img'
    },
    svg: {
        icons: {
            src    : srcPath        + '/svg/icons/**/*.svg',
            mode: {
                symbol: {
                    dest   : './',
                    sprite : 'icons.svg',
                    bust   : false
                }
            }
        },
        sprite: {
            src    : srcPath        + '/svg/sprite/**/*.svg',
            mode: {
                stack: {
                    dest   : './',
                    sprite : 'sprite.svg',
                    bust   : false
                }
            }
        },
        build      : buildPath      + '/img',
        styleguide : styleguidePath + '/img',
        parameters: {
            xmlDeclaration      : false,
            doctypeDeclaration  : false,
            dimensionAttributes : false
        }
    },
    browserSync: {
        server: {
            baseDir : styleguidePath
        },
        open  : false,
        watch : true
    }
}
