import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
// import { state } from './state';
// import { getters } from './getters';
// import { mutations } from './mutations';
// import { actions } from './actions';
// const rpCanvas = function(c) {
// 	this.c = c;
// }

const state = {
	width: 0,
	height: 0,
	canvases: ['canvas', 'stars', 'movement', 'chart'],
	active: []
};

const getters = {
	canvases: () =>	state.canvases,
	width: () => state.width,
	height: () => state.height
};

const mutations = {
	SET_CANVASES(s, canvases) {
		state.canvases = canvases
	},
	SET_WIDTH() {
    state.width =  window.innerWidth || d.documentElement.clientWidth || d.body.clientWidth;
	},
	SET_HEIGHT() {
    state.height =  window.innerHeight|| d.documentElement.clientHeight|| d.body.clientHeight;
	}
};

const actions = {
	setCanvases({commit}, canvases) {
		commit('SET_CANVASES', canvases);
	},
	setWidth({commit}) {
		commit('SET_WIDTH');
	},
	setHeight({commit}) {
		commit('SET_HEIGHT');
	}
};

export default new Vuex.Store({
	state,
	getters,
	mutations,
	actions
})