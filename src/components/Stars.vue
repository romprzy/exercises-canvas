<template>
	<div>
		<canvas :id="canvasId"></canvas>
	</div>
</template>

<script>
	export default {
		props: ['canvasId', 'config'],
		data() {
			return {
				c: false,
				stars: {
					items: []
				}
			}
		},
		methods: {
			getWidth() {
		    return window.innerWidth || d.documentElement.clientWidth || d.body.clientWidth;
			},
			getHeight() {
		    return window.innerHeight|| d.documentElement.clientHeight|| d.body.clientHeight;
			},
			initCanvas() {
				const canvas = document.getElementById(this.canvasId);
				// const width = w.innerWidth;
				// const height = w.innerHeight;
				canvas.width = this.getWidth();
				canvas.height = this.getHeight();

				this.c = canvas.getContext('2d');
			},
			Circle($vue, x, y, radius, vx, vy) {
				const self = $vue;
				// let c = canvas.getContext('2d');
				const c = self.c;
				this.x = x;
				this.y = y;
				// this.radius = radius;
				this.radius = radius;
				this.vx = self.config.vx ? self.randomSign() * self.randNumber(self.config.vx) : 0;
				this.vy = self.config.vy ? self.randomSign() * self.randNumber(self.config.vy) : 0;
				this.color = self.generateColor();
				// console.log('vx = ', vx);
				this.draw = function() {
					c.beginPath();
					c.arc(x, y, radius, 0, 2 * Math.PI, vx, vy);
					c.fillStyle = this.color;
					c.fill();
				}

				this.update = function() {
					// this.radius++;
					if (this.x > self.width - this.radius || this.x < this.radius) this.vx = -this.vx;
					this.x += this.vx;
					if (this.y > self.height - this.radius || this.y < this.radius) this.vy = -this.vy;
					this.y += this.vy;


					c.beginPath();
					c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, this.vx, this.vy);
					c.fillStyle = this.color;
					c.fill();
					// this.draw();
				}
				// c.moveTo(200, 0);
				// c.lineTo(200, 0);
				// c.stroke();
			},
			generateColor() {
				const color = this.config.color;
				const red = this.randNumber(color.r);
				const green = this.randNumber(color.g);
				const blue = this.randNumber(color.b);
				const opacity = this.randNumber({min: 100 * color.opacity.min, max: 100 * color.opacity.max}) / 100;
				return 'rgba(' + red + ', ' + green + ', ' + blue + ', ' + opacity + ')';
			},
			randomSign() {
				if (Math.random() < .5) {
					return -1;
				}
				return 1;
			},
			randNumber({min, max}) {
				return Math.random() * (max - min) + min;
			},
			animate() {
				let self = this;
				requestAnimationFrame(self.animate);
				// console.log('x = ' + self.x + ', y = ' + self.y);
				const c = self.c;
				const width = self.width;
				const height = self.height;
				c.clearRect(0, 0, width, height);

				self.stars.items.forEach((circle) => {
					circle.update();
					// console.log(circle);
				})

				const config = self.config;
				const radius = self.randNumber(config.radius);
				// console.log('width = ' + width);
				// console.log('radius = ' + radius);
				// console.log('width - radius = ' + (width - radius));
				// console.log('config.vx = ' + config.vx);
				const x = self.randNumber({min: radius, max: (width - radius)});
				const y = self.randNumber({min: radius, max: (height - radius)});
				const vx = config.vx ? self.randNumber(config.vx) : 0;
				const vy = config.vy ? self.randNumber(config.vy) : 0;
				// console.log('x = ' + x);
				// const delay = self.randNumber(self.config.delay);


				if (self.stars.items.length < self.config.number.max) {
					const circle = new self.Circle(self, x, y, radius, vy, vy);
					self.stars.items.push(circle);
					// console.log('self.stars.items.length', self.stars.items.length);
					// console.log('self.config.number.max', self.config.number.max);
					circle.draw();
				}

				// c.beginPath();
				// c.arc(self.x, self.y, self.radius, 0, 2 * Math.PI);
				// if (self.x > width - self.radius || self.x < self.radius) self.vx = -self.vx;
				// self.x += self.vx;
				// if (self.y > height - self.radius || self.y < self.radius) self.vy = -self.vy;
				// self.y += self.vy;
				// // c.fillStyle = 'red';
				// c.fillStyle = self.color;
				// self.changeX(self.x + self.vx);
				// c.fill();
			}
		},
		computed: {
			width() {
		    return window.innerWidth || d.documentElement.clientWidth || d.body.clientWidth;
			},
			height() {
		    return window.innerHeight|| d.documentElement.clientHeight|| d.body.clientHeight;
			},
			// x() {
			// 	return Math.random() * this.width - this.radius;
			// },
			// x: {
			// 	set(newValue) {
			// 		this.x = newValue;
			// 	},
			// 	get() {
			// 		return this.x;
			// 	}
			// },
			// y() {
			// 	return Math.random() * this.height - this.radius;
			// },
			color() {
				return this.generateColor();
			}
		},
		mounted() {
			const self = this;
			self.c;
			const config = this.config;
			console.log('config', config);
			self.initCanvas();
			// const number = self.randNumber(config.number);
			for (let i = 0; i < self.config.number.min; i++) {
				const radius = self.randNumber(config.radius);
				const x = self.randNumber({min: radius, max: (self.width - radius)});
				const y = self.randNumber({min: radius, max: (self.height - radius)});
				const vx = config.vx ? self.randomSign() * self.randNumber(config.vx) : 0;
				const vy = config.vy ? self.randomSign() * self.randNumber(config.vy) : 0;
				console.log('vx', vx);
				// const delay = self.randNumber(self.config.delay);


				const circle = new self.Circle(self, x, y, radius, vy, vy);
				self.stars.items.push(circle);
				circle.draw();
			}
			console.log(self.stars);

			self.animate();
			console.log(self.stars);
		}

			// this.animate();
		// 	// this.rpDrawRectangle();
		// 	for (let i = 0; i < 1000; i++) {
		// 		console.log(i);
		// 		const radius = 40;
		// 		const x = Math.random() * (width - 2 * radius) + radius;
		// 		const y = Math.random() * (height - 2 * radius) + radius;

		// 		c.beginPath();
		// 		c.arc(x, y, radius, 0, 2 * Math.PI);
		// 		c.fillStyle = 'red';
		// 		c.fill();
		// 		// c.moveTo(200, 0);
		// 		// c.lineTo(200, 0);
		// 		c.strokeStyle = 'rgba(200, 0, 0, .75';
		// 		c.stroke();

		// 		// this.Circle(x, 100, 50, 0, 0);
		// 	}
	}
</script>

<style lang="scss">
html, body {
	height: 100vh;
	overflow: hidden;
}
</style>
