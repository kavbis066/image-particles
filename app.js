window.addEventListener('load', () => {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
        constructor(effect, x, y, color) {
            this.effect = effect;
            // this.x = Math.random() * canvas.width;
            // this.y = Math.random() * canvas.height;
            this.x = Math.random() * this.effect.width;
            this.y = Math.random() * this.effect.height;
            this.size = this.effect.gap;
            this.color = color;
            this.originX = Math.floor(x);
            this.originY = Math.floor(y);
            this.vx = 1;
            this.vy = 1;
            this.ease = 0.1;
        }

        draw(context) {
            context.fillStyle = this.color;
            context.fillRect(this.x, this.y, this.size, this.size);
        }

        update() {
            this.x += (this.originX - this.x) * this.ease;
            this.y += (this.originY - this.y) * this.ease;
        }
    }

    class Effect {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.particleArray = [];
            this.image = document.getElementById('image1');
            this.centerX = this.width * 0.5;
            this.centerY = this.height * 0.5;
            this.x = this.centerX - this.image.width * 0.5;
            this.y = this.centerY - this.image.height * 0.5;
            this.gap = 1;
        }

        init(context) {
            // for (let i = 0; i < 10; i++) {
            //     this.particleArray.push(new Particle());
            // }
            context.drawImage(this.image, this.x, this.y);
            const pixels = context.getImageData(0, 0, this.width, this.height).data;
            // console.log(pixels);

            for (let y = 0; y < this.height; y += this.gap) {
                for (let x = 0; x < this.width; x += this.gap) {
                    const index = (y * this.width + x) * 4;
                    const r = pixels[index];
                    const g = pixels[index + 1];
                    const b = pixels[index + 2];
                    const a = pixels[index + 3];

                    const color = `rgb(${r}, ${g}, ${b})`;
                    if (a > 0) {
                        this.particleArray.push(new Particle(this, x, y, color));
                    }
                }
            }
        }

        draw(context) {
            this.particleArray.forEach(particle => particle.draw(context));
        }

        update() {
            this.particleArray.forEach(particle => particle.update());
        }
    }

    const effect = new Effect(canvas.width, canvas.height);
    effect.init(ctx);

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        effect.draw(ctx);
        effect.update();
        requestAnimationFrame(animate);
    }

    animate();
});