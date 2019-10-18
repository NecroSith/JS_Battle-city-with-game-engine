(function() {
    'use strict';

    class Container extends GameEngine.DisplayObject {
        constructor(args = {}) {
            super(args);
            this.displayObjects = [];

            // We don't need width and height attributes in Container
            // So we can delete them from here
            // * This is not recommended
            delete this.width;
            delete this.height;
        }

        add(displayObject) {
            if (!this.displayObjects.includes(displayObject)) {
                this.displayObjects.push(displayObject);
                displayObject.setParent(this);
            }
        }

        remove(displayObject) {
            if (this.displayObjects.includes(displayObject)) {
                const index = this.displayObjects.indexOf(displayObject);
                this.displayObjects.splice(index, 1);
                displayObject.setParent(null);
            }
        }

        // Calls draw method in all display objects
        draw(canvas, context) {
            context.save();
            // Changes the coordinates of the origin (top left) of the image
            context.translate(this.x, this.y);

            context.scale(this.scaleX, this.scaleY);
            context.rotate(-this.rotation);

            for (const displayObject of this.displayObjects) {
                displayObject.draw(canvas, context);
            }

            context.restore();
        }


    }


    window.GameEngine = window.GameEngine || {};
    window.GameEngine.Container = Container;
}());