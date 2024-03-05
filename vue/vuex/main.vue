<template>
    <div>
		<h1> {{ $store.state.name }} </h1>
		<h1> Vuex Name： {{ name }} </h1>
		<h1> Vuex Age： {{ age }} </h1>
		<h1> Vuex Account： {{ count }} </h1>
		<h1> getters Account： {{ $store.getters.newCount }} </h1>
		<button @click="clickAddCount">增加count</button>
		<button @click="clickAsyncReduce">异步减count</button>

		<h1> module A name： {{ $store.state.a.name }} </h1>
    </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
	name: 'App',
	computed: {
		...mapState(['name', 'age', 'count'])
	},
	methods: {
		...mapMutations(['addCount', 'reduce']),
		...mapActions(['asyncReduce']),
		clickAddCount() {
			this.$store.commit('addCount', 20);
			console.log('同步：', this.count);
		},
		clickAsyncReduce() {
			this.$store.dispatch('asyncReduce');
			console.log('异步：', this.count);
		}
	}
}
</script>