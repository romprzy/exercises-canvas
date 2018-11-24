<template>
  <div id="app" class="text-center">
  	<nav id="menu">
  		<button v-for="item in canvases" @click="active = item" :class="{active: active === item}">{{item}}</button>
  	}
  	}
  	</nav>
		<rp-canvas v-if="active === canvasId" :canvasId="canvasId"></rp-canvas>
		<rp-stars v-if="active === 'stars'" canvasId="stars" :config="stars"></rp-stars>
		<rp-movement v-if="active === 'movement'" canvasId="movement"></rp-movement>
		<rp-chart v-if="active === 'chart'" canvasId="chart"></rp-chart>
  </div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';

	import rpCanvas from './components/Canvas';
	import rpStars from './components/Stars';
	import rpMovement from './components/Movement';
	import rpChart from './components/Chart';

	export default {
	  name: 'app',
	  components: {
	  	rpCanvas,
	  	rpStars,
	  	rpMovement,
	  	rpChart
	  },
	  data () {
	    return {
	    	canvasId: 'canvas',
	    	active: 'chart',
	    	stars: {
	    		number: {
	    			min: 1,
	    			max: 10
	    		},
	    		delay: {
	    			min: 100,
	    			max: 500
	    		},
	    		color: {
	    			r: {
	    				min: 0,
	    				// min: 225,
	    				max: 255
	    			},
	    			g: {
	    				min: 0,
	    				// min: 225,
	    				max: 255
	    			},
	    			b: {
	    				min: 0,
	    				max: 255
	    			},
	    			opacity: {
	    				min: 0,
	    				max: 1
	    			}
	    		},
	  			radius: {
	  				min: .5,
	  				max: 200
	  			},
	  			vx: {
	  				// min: false,
	  				// max: false
	  				min: .1,
	  				max: 1.5
	  			},
	  			vy: {
	  				// min: false,
	  				// max: false
	  				min: .1,
	  				max: 1.25
	  			}
	    	}
	    }
	  },
	  computed: {
	  	...mapGetters([
				'width',
				'height',
	  		'canvases'
  		])
	  },
	  methods: {
	  	...mapActions([
	  		'setWidth',
				'setHeight',
			])
	  },
	  mounted() {
			this.setWidth();
			this.setHeight();
	  }
	}
</script>

<style lang="scss">
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	body {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: #014;
		box-shadow: 0 0 600px 120px rgba(0,0,0,.75) inset;
		overflow: hidden;
	}

	.container {
		display: flex;
		flex-direction: row;
	}

	.col-6 {
		width: 50%;
	}

	.text-center {
		text-align: center;
	}

	canvas {
		position: fixed;
		left: 0;
		top: 0;
		user-select: none;
	}

	#menu {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999999;
	}
	
	button, .button {
		padding: .25em 1em;
		border-radius: 6px;
		background: #ccc;
		border: none;
		margin: .25em;
		user-select: none;
		outline: none;
		cursor: pointer;

		&.active {
			background: rgba(0, 190, 0, .75);
		}
	}
</style>
