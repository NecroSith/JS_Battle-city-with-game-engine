(function() {
    'use strict';

    class Renderer {
        constructor(args = {}) {
            this.canvas = document.createElement('canvas');
            this.context = this.canvas.getContext('2d');

            this.canvas.width = args.width || 50;
            this.canvas.height = args.width || 50;
            this.background = args.background || 'white';
            this.update = args.update || (() => {})

            this.stage = new GameEngine.Container();

            requestAnimationFrame(timestamp => this.tick(timestamp));
        }

        tick(timestamp) {
            this.update(timestamp);
            this.clear();

            this.render();

            requestAnimationFrame(timestamp => this.tick(timestamp));
        }

        get displayObjects() {
            return getDisplayObjects(this.stage);

            // Function is here so it's only accessible for this getter and not for anything else
            // It iterates through all displayObjects (objects which are currently displayed on the canvas) and return them
            // If the object is a container function calls itself and iterate through this container
            function getDisplayObjects(container, result = []) {
                for (let displayObject of container.displayObjects) {
                    if (displayObject instanceof GameEngine.Container) {
                        getDisplayObjects(displayObject, result);
                    } else {
                        result.push(displayObject);
                    }
                }
                return result;
            }
        }

        render() {
            this.stage.draw(this.canvas, this.context);
        }

        clear() {
            this.context.beginPath();
            this.context.fillStyle = this.background;
            this.context.rect(0, 0, this.canvas.width, this.canvas.height);
            this.context.fill();
        }
    }


    window.GameEngine = window.GameEngine || {};
    window.GameEngine.Renderer = Renderer;
}());