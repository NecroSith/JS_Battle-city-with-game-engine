;
(function() {
    'use strict';

    class Loader {
        constructor() {
            this.loadOrder = {
                images: [],
                jsons: []
            }
            this.resources = {
                images: [],
                jsons: []
            }
        }

        addImage(name, src) {
            this.loadOrder.images.push({ name, src });
            console.log(this.loadOrder.images);
        }

        addJson(name, address) {
            this.loadOrder.jsons.push({ name, address });
            console.log(this.loadOrder.jsons);
        }

        getImage(name) {
            console.log(this.resources.images.name);
            return this.resources.images[name];
        }

        getJson(name) {
            return this.resources.jsons[name];
        }

        load(type, callback) {
            let promises = [];
            switch (type) {
                case 'img':
                    promises.push(Loader.addToResources(this.loadOrder.images, Loader.loadImage, this.resources.images));
                    break;
                case 'json':
                    promises.push(Loader.addToResources(this.loadOrder.jsons, Loader.loadJson, this.resources.jsons));
                    break;
                default:
                    console.log('Unknown type');
                    break;
            }
            // Awaits completion of all promises and calls callback function after 
            Promise.all(promises).then(callback);
        }

        static addToResources(loadOrderArr, promiseOnLoad, loadResourcesArr) {
            const promises = [];
            for (const data
                of loadOrderArr) {
                const name = Object.keys(data)[0];
                const src = Object.keys(data)[1];
                console.log(data);
                const promise = promiseOnLoad(data[src])
                    .then(obj => {
                        // Adding data to resources
                        loadResourcesArr[data[name]] = obj;
                        console.log(loadResourcesArr);

                        // deleting same data from loadOrder 
                        if (loadOrderArr.includes(data)) {
                            const index = loadOrderArr.indexOf(data);
                            loadOrderArr.splice(index, 1);
                        }
                        // document.body.append(obj);
                    })
                promises.push(promise);
            }
            // Await completion of all promises
            return Promise.all(promises);
        }

        // Static method is available to the class itself only
        // and not to its instances
        // Is available via GameEngine.Loader.loadImage
        // but new GameEngine().Loader.loadImage won't work
        static loadImage(src) {
            return new Promise((resolve, reject) => {
                try {
                    const image = new Image();
                    image.onload = () => resolve(image);
                    image.src = src;
                } catch (err) {
                    reject(err)
                }
            })
        }

        static loadJson(address) {
            return new Promise((resolve, reject) => {
                fetch(address)
                    .then(result => {
                        result.json();
                    })
                    .then(result => resolve(result))
                    .catch(err => reject(err));
            })
        }
    }

    window.GameEngine = window.GameEngine || {}
    window.GameEngine.Loader = Loader;

}());