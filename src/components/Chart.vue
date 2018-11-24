<template>
	<div>
		<rp-axis
			:canvasId="'axis'"
			:center="{x: width / 2, y: height / 2}"
			:width="width"
			:height="height"
			:unit="unit"
		></rp-axis>
		<canvas :id="canvasId"></canvas>
		<div class="stats container">
			<pre class="col-6">{{config}}</pre>
			<pre class="col-6">{{stats}}</pre>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import rpAxis from './Axis';

	export default {
		components: {
			rpAxis
		},
		data() {
			return {
				canvasId: 'chart',
				c: false,
				unit: 25,
				config: {
					x: 0,
					y: 0,
					vx: 1,
					vy: 0,
					radius: .5,
					color: '#fff'
				},
				stats: {
					x: 0,
					y: false
				},
				charts: {
					items: []
				}
			}
		},
		methods: {
			initCanvas(x) {
				const canvas = document.getElementById(this.canvasId);
				// const width = w.innerWidth;
				// const height = w.innerHeight;
				canvas.width = this.width;
				canvas.height = this.height;

				x = canvas.getContext('2d');
			},
			quadraticCurve() {
				const c = this.c;
				c.beginPath();
				c.moveTo(this.width / 2, this.height / 2);
				c.quadraticCurveTo(this.width / 2 + 25, this.height / 2, this.width / 2 + 25, this.height / 2 - 25);
				// c.bezierCurveTo(this.width / 2 + 25, this.height / 2, this.width / 2 + 25, this.height / 2 - 25);
				c.strokeStyle = "rgba(255, 255, 0, 1)";
				c.stroke();
				// c.fill();
			},
			Circle($vue, x, y, radius, color, vx, vy = false) {
				const self = $vue;
				// let c = canvas.getContext('2d');
				const c = self.c;
				this.x = x;
				this.y = y;
				// this.radius = radius;
				this.radius = radius;
				this.color = color;
				this.vx = vx;
				// this.vy = vy;
				this.vy = 1;
				// console.log('vx = ', vx);
				this.draw = function() {
					c.beginPath();
					c.moveTo(x, y);
					c.arc(x, y, radius, 0, 2 * Math.PI, vx, vy);
					c.fillStyle = this.color;
					c.fill();
				}

				this.update = function() {
					// this.radius++;
					if (this.x > self.width) {
						this.x = self.config.x;
						this.y = self.config.y;
					}
					this.x += this.vx;
					this.y = self.height / 2 - self.unit * Math.sin(this.x / self.unit);

					self.stats.x = this.x;
					self.stats.y = this.y;
					self.stats.vx = this.vx;
					self.stats.vy = this.vy;

					// console.log('x = ', this.x);
					// console.log('y = ', this.y);

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
			// generateColor() {
			// 	const color = this.config.color;
			// 	const red = this.randNumber(color.r);
			// 	const green = this.randNumber(color.g);
			// 	const blue = this.randNumber(color.b);
			// 	const opacity = this.randNumber({min: 100 * color.opacity.min, max: 100 * color.opacity.max}) / 100;
			// 	return 'rgba(' + red + ', ' + green + ', ' + blue + ', ' + opacity + ')';
			// },
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
				const c = self.c;
				const width = self.width;
				const height = self.height;
				// c.clearRect(0, 0, width, height);

				self.charts.items.forEach((circle) => {
					circle.update();
				})


					// const config = self.config;
					// const radius = self.randNumber(config.radius);
					// const x = self.randNumber({min: radius, max: (width - radius)});
					// const y = self.randNumber({min: radius, max: (height - radius)});
					// const vx = config.vx ? self.randNumber(config.vx) : 0;
					// const vy = config.vy ? self.randNumber(config.vy) : 0;

					// const circle = new self.Circle(self, x, y, radius, vy, vy);
					// self.charts.items.push(circle);
					// circle.draw();
			}
		},
		computed: {
			...mapGetters([
				'width',
				'height'
			])
			// color() {
			// 	return this.generateColor();
			// }
		},
		mounted() {
			const self = this;
			// self.c;
			const config = this.config;
			console.log('config', config);
			self.initCanvas(self.c);
			this.quadraticCurve();
			// self.drawAxis(this.width / 2, this.height / 2);

			// for (let i = 0; i < self.config.number.min; i++) {
			const radius = self.config.radius;
			const x = self.config.x = 0;
			const y = self.config.y = self.height / 2;
			const vx = self.config.vx;
			// const vy = 0;
			const color = '#fff';
			// const delay = self.randNumber(self.config.delay);


			const circle = new self.Circle(self, x, y, radius, color, vx);
			self.charts.items.push(circle);
			circle.draw();
			// }
			console.log(self.charts);

			self.animate();
			console.log(self.charts);
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
		font-family: arial;
	}
	pre {
		text-align: left;
	}
	.stats {
		position: fixed;
		top: 0;
		right: 0;
		width: 500px;
		z-index: 9999;
		color: #fff;
		background: rgba(180, 0, 0, .5);
		padding: .75em 1em;
		font-size: 16px;
		line-height: 1.5em;
	}
</style>
