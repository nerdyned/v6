 const canvas = document.createElement('canvas');
    canvas.id = 'snowCanvas';
    document.body.appendChild(canvas);

    Object.assign(canvas.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        zIndex: '-1',
        pointerEvents: 'none',
    });

    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    function Snowflake() {
        this.reset();
    }

    Snowflake.prototype.reset = function() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speed = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.4 + 0.2;
        this.wind = (Math.random() - 0.5) * 0.5;
    };

    Snowflake.prototype.update = function() {
        this.y += this.speed;
        this.x += this.wind;

        if (this.y > canvas.height) {
            this.reset();
            this.y = 0;
        }
    };

    Snowflake.prototype.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
    };

    const snowflakes = [];

    for (let i = 0; i < 150; i++) {
        snowflakes.push(new Snowflake());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        snowflakes.forEach(snowflake => {
            snowflake.update();
            snowflake.draw();
        });

        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener("resize", function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
