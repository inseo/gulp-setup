# Gulp setup

Configuration Gulp permettant d'automatiser les tâches suivantes :

* compilation des fichiers Sass grâce à [gulp-sass](https://www.npmjs.com/package/gulp-sass) ;
* ajout des préfixes propriétaire grâce à [autoprefixer](https://www.npmjs.com/package/autoprefixer) ;
* concaténation des fichiers JavaScript grâce à [gulp-concat](https://www.npmjs.com/package/gulp-concat) ;
* génération de sprites SVG grâce à [gulp-svg-sprite](https://www.npmjs.com/package/gulp-svg-sprite) ;
* copie des fichiers statiques ;
* visualisation du rendu sur un serveur local et rafraichissement automatique des pages lors de la mise à jour des fichiers source grâce à [Browsersync](https://www.browsersync.io/).

## Configuration

Les données de configuration (chemins, noms de fichier, compatibilité attendue) se trouvent dans le fichier `gulpConfig.js`.
Il est également possible de désactiver chaque tâche individuellement.

* `settings.styles` active la compilation des fichiers Sass ;
* `settings.scripts` active la concaténation des fichiers JavaScript ;
* `settings.standaloneScripts` active la copie des fichiers JavaScript n'ayant pas vocation à être concaténé ;
* `settings.images` active la copie des images ;
* `settings.svgIcons` active la génération d'un Sprite SVG destiné à être appelé dans le code HTML via un élément `use` ;
* `settings.svgSprite` active la génération d'un Sprite SVG destiné à être utilisé comme élément d'arrière-plan dans le code CSS ;
* `settings.fonts` active la copie des polices.

## Commandes disponibles

Les commandes disponibles sont listées dans le fichier `package.json`.
Elles sont au nombre de 8 et sont utilisables dans le terminal via l'instruction `npm run [nom de la commande]`.

* `npm run dev` démarre l'exécution des tâches gulp en mode de développement (les fichiers source sont ensuite surveillés) ;
* `npm run prod` démarre l'exécution des tâches gulp en mode de production ;
* `npm run styleguide` génère le styleguide [KSS](https://warpspire.com/kss/) ;
* `npm run watch-styleguide` génère le styleguide à l'exécution de la commande (il est regénéré à chaque modification) ;
* Les commandes `npm run dev-with-styleguide` et `npm run prod-with-styleguide` sont identiques à `npm run dev` et `npm run prod`, à la différence près qu'elles font une copie des assets dans le répertoire du styldeguide ;
* `npm run jslint` démarre le linting des fichiers JavaScript grâce à [eslint](https://eslint.org/)
* `npm run csslint` démarre le linting des fichiers Sass grâce à [stylelint](https://stylelint.io/)

La commande `npm run watch-styleguide` marche de concert avec la commande `npm run dev-with-styleguide`. Elle doit être exécutée dans un onglet distinct du terminal car `npm run dev` ne rend pas la main sans avoir été stoppée.
Pour stopper une commande en cours d'exécution, utilisez les touches <kbd>Ctrl</kbd>+<kbd>C</kbd>.

Le linting des fichiers n'est volontairement pas inclus dans le workflow Gulp pour éviter de ralonger inutilement le temps de traitement. Le plus simple est d'activer le linting lors de l'enregistrement des fichiers dans votre éditeur de code.

### Mode de de développement vs Mode de production

En mode de développement, les source maps sont automatiquement générées pour les fichiers JavaScript et CSS grâce à [gulp-sourcemaps](https://www.npmjs.com/package/gulp-sourcemaps) et les fichiers source sont surveillés par Browsersync.

En mode de production, les media queries redondantes sont mergées grâce à [CSS MQPacker](https://www.npmjs.com/package/css-mqpacker), le fichier CSS est minifié grâce à [cssnano](https://www.npmjs.com/package/cssnano), les fichiers JS sont obscurcis et minifiés grâce à [gulp-uglify](https://www.npmjs.com/package/gulp-uglify) et les images sont optimisées grâce à [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin).