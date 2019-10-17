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
            return this.resources.images[name];
        }

        getJson(name) {
            return this.resources.jsons[name];
        }

        load(callback) {
            const promises = [];
            for (const data
                of this.loadOrder.images) {
                const { name, src } = data;
                console.log(data);
                const promise = Loader.loadImage(src)
                    .then(obj => {
                        // Adding data to resources
                        this.resources.images[name] = obj;

                        // deleting same data from loadOrder 
                        if (this.loadOrder.images.includes(data)) {
                            const index = this.loadOrder.images.indexOf(data);
                            this.loadOrder.images.splice(index, 1);
                        }
                        console.log(obj);
                        // document.body.append(obj);
                    })

                promises.push(promise);
            }

            for (const data
                of this.loadOrder.jsons) {
                const { name, address } = data;
                console.log(data);
                const promise = Loader.loadJson(address)
                    .then(obj => {
                        // Adding data to resources
                        this.resources.jsons[name] = obj;

                        // deleting same data from loadOrder 
                        if (this.loadOrder.jsons.includes(data)) {
                            const index = this.loadOrder.jsons.indexOf(data);
                            this.loadOrder.jsons.splice(index, 1);
                        }
                    })
                promises.push(promise);
            }
            console.log(promises)
            Promise.all(promises).then(callback);
        }

        //! Doesn't work for now. TODO: figure out and fix. Used duplication instead

        // load(type, callback) {
        //     let promises = [];
        //     switch (type) {
        //         case 'img':
        //             promises.push(Loader.addToResources(this.loadOrder.images, Loader.loadImage, this.resources.images));
        //             console.log(promises);
        //             break;
        //         case 'json':
        //             promises.push(Loader.addToResources(this.loadOrder.jsons, Loader.loadJson, this.resources.jsons));
        //             break;
        //         default:
        //             console.log('Unknown type');
        //             break;
        //     }
        //     // Awaits completion of all promises and calls callback function after 
        //     const newPromises = promises.flat();
        //     console.log(newPromises);
        //     Promise.all(promises.flat()).then(callback);
        // }

        // static addToResources(loadOrderArr, promiseOnLoad, loadResourcesArr) {
        //     const promises = [];
        //     for (const data
        //         of loadOrderArr) {
        //         const name = Object.keys(data)[0];
        //         const src = Object.keys(data)[1];
        //         console.log(data);
        //         const promise = promiseOnLoad(data[src])
        //             .then(obj => {
        //                 // Adding data to resources
        //                 loadResourcesArr[data[name]] = obj;
        //                 console.log(loadResourcesArr);

        //                 // deleting same data from loadOrder 
        //                 if (loadOrderArr.includes(data)) {
        //                     const index = loadOrderArr.indexOf(data);
        //                     loadOrderArr.splice(index, 1);
        //                 }
        //             })
        //         promises.push(promise);
        //         console.log(promises);
        //         return promises;
        //     }
        // }

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