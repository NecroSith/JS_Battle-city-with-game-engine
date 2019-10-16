(function() {
    'use strict';

    class Loader {
        constructor() {

        }

        static loadImage(src) {
            return new Promise((resolve, reject) => {
                try {
                    const image = new Image();
                    image.onload = () => resolve(image);
                    image.src = src
                } catch (err) {
                    reject(err)
                }
            })
        }
    }

    window.GameEngine = window.GameEngine || {}
    window.GameEngine.Loader = Loader;

}());