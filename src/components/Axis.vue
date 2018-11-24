<template>
	<canvas :id="canvasId"></canvas>
</template>

<script>
	export default {
		data() {
			return {
				c: false
			}
		},
		props: ['canvasId', 'center', 'width', 'height', 'unit'],
		methods: {
			initCanvas() {
				const canvas = document.getElementById(this.canvasId);
				canvas.width = this.width;
				canvas.height = this.height;

				this.c = canvas.getContext('2d');
			},
			drawAxis(x, y) {
				console.log('drawAxis x = ', x);
				console.log('drawAxis y = ', y);
				const c = this.c;
				c.beginPath();
				c.moveTo(x, 0);
				c.lineTo(x, this.height);
				c.moveTo(0, y);
				c.lineTo(this.width, y);
				c.strokeStyle = "red";
				c.stroke();
			},
			drawLines() {
				const c = this.c;
				c.beginPath();
				c.moveTo(0, this.center.y + this.unit);
				c.lineTo(this.width, this.center.y + this.unit);
				c.moveTo(0, this.center.y - this.unit);
				c.lineTo(this.width, this.center.y - this.unit);
				c.strokeStyle = "rgba(0, 255, 0, 1)";
				c.lineWidth = .5;
				c.stroke();
			}
		},
		mounted() {
			console.log('Axis');
			this.initCanvas();
			this.drawLines();
			this.drawAxis(this.center.x, this.center.y);
		}
	}
</script>

<style lang="scss">
</style>
