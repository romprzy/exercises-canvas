<template>
	<canvas :id="canvasId">{{x}}</canvas>
</template>

<script>
	export default {
		props: ['canvasId'],
		data() {
			return {
				vmin: 0,
				vmax: 12,
				rmax: 50,

				x: 0,
				y: 0,
				vx : Math.random() * 4,
				vy : Math.random() * 3
			}
		},
		methods: {
			Circle(x, y, radius, vx, vy) {
				// let c = canvas.getContext('2d');
				c.beginPath();
				c.arc(x, y, radius, 0, 2 * Math.PI);
				c.fillStyle = 'red';
				c.fill();
				// c.moveTo(200, 0);
				// c.lineTo(200, 0);
				c.stroke();
			},
			generateColor() {
				const red = Math.random() * 256;
				const green = Math.random() * 256;
				const blue = Math.random() * 256;
				const opacity = Math.random();
				return 'rgba(' + red + ', ' + green + ', ' + blue + ', ' + opacity + ')';
			},
			changeX(x) {
				this.compX = x;
			},
			animate() {
				let self = this;
				// console.log('x = ' + self.x + ', y = ' + self.y);
				const c = self.c;
				const width = self.width;
				const height = self.height;
				requestAnimationFrame(self.animate);
				c.clearRect(0, 0, width, height);


				c.beginPath();
				c.arc(self.x, self.y, self.radius, 0, 2 * Math.PI);
				if (self.x > width - self.radius || self.x < self.radius) self.vx = -self.vx;
				self.x += self.vx;
				if (self.y > height - self.radius || self.y < self.radius) self.vy = -self.vy;
				self.y += self.vy;
				// c.fillStyle = 'red';
				c.fillStyle = self.color;
				self.changeX(self.x + self.vx);
				c.fill();
			}
		},
		computed: {
			width() {
		    return window.innerWidth || d.documentElement.clientWidth || d.body.clientWidth;
			},
			height() {
		    return window.innerHeight|| d.documentElement.clientHeight|| d.body.clientHeight;
			},
			min() {
				return this.width > this.height ? this.height : this.width;
			},
			max() {
				return this.width > this.height ? this.width : this.height;
			},
			c() {
				const canvas = document.querySelector('canvas');
				// const width = w.innerWidth;
				// const height = w.innerHeight;
				canvas.width = this.width;
				canvas.height = this.height;

				return canvas.getContext('2d');
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
			radius() {
				return Math.random() * this.min / 5;
			},
			color() {
				return this.generateColor();
			}
		},
		mounted() {
			this.x = Math.random() * (this.width - this.radius) + this.radius;
			this.y = Math.random() * (this.height - this.radius) + this.radius;
			this.animate();
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
	}
</script>

<style lang="scss">
</style>
