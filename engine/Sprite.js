(function() {
    'use strict';

    class Sprite extends GameEngine.DisplayObject {
        constructor(texture, args = []) {
            super(args);
            this.texture = texture;

            const frame = args.frame || {}

            this.frame = {
                x: frame.x || 0,
                y: frame.y || 0,
                width: frame.width || texture.width,
                height: frame.width || texture.height
            }

            if (args.width === undefined) {
                this.width = this.frame.width;
            }

            if (args.height === undefined) {
                this.height = this.frame.height;
            }

            this.height = args.height || this.frame.height;
        }

        draw(canvas, context) {
            context.save();

            // Changes the coordinates of the origin (top left) of the image
            context.translate(this.x, this.y);
            context.scale(this.scaleX, this.scaleY);
            context.rotate(-this.rotation);

            context.drawImage(
                this.texture,

                this.frame.x,
                this.frame.y,
                this.frame.width,
                this.frame.height,

                this.absoluteX - this.x,
                this.absoluteY - this.y,
                this.width,
                this.height

                // We don't need to specify scale based width and height anymore as they are performed above in context.scale
                // this.width * this.scaleX,
                // this.height * this.scaleY
            )

            // Draw anchor point above the image

            context.beginPath();
            context.fillStyle = 'red';
            context.arc(0, 0, 5, 0, Math.PI * 2);
            context.fill();
            context.restore();
        }

    }


    window.GameEngine = window.GameEngine || {};
    window.GameEngine.Sprite = Sprite;
}());