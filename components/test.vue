<template>
	<view id="testId">
		这是test组件{{ num }},父组件传值{{ name }}
		<button type="default" @click="setFarther">子组件传值</button>
		<button type="default" @click="setEmit">全局事件触发</button>
	</view>
</template>

<script>
	export default {
		props: ['name'],
		name:"test",
		beforeCreate() {
			console.log('beforeCreate在实例初始化之后被调用', this.num)
		},
		created() {
			this.timer = setInterval(() => {
				console.log('定时器执行中！！')
			}, 1000)
			console.log('created在实例创建完成后被立即调用', this.num)
		},
		beforeMount() {
			console.log('beforeMount在挂载开始之前被调用')
			// #ifdef H5
			console.log(document.getElementById('testId'))
			// #endif
		},
		mounted() {
			console.log('mounted挂载到实例上去之后调用')
			// #ifdef H5
			console.log(document.getElementById('testId'))
			// #endif
		},
		beforeUpdate() {
			console.log('beforeUpdate数据更新时调用，发生在虚拟 DOM 打补丁之前,仅H5支持')
		},
		updated() {
			console.log('updated由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子,仅H5支持')
		},
		beforeDestroy() {
			console.log('beforeDestroy实例销毁之前调用')
		},
		destroyed() {
			clearInterval(this.timer)
			console.log('destroyedVue 实例销毁后调用')
		},
		data() {
			return {
				num: 3,
				timer: null
			};
		},
		methods: {
			setFarther() {
				this.$emit('setFarther', 'setFarther的参数')
			},
			setEmit() {
				uni.$emit('globalEvent', 10)
			}
		}
	}
</script>

<style>

</style>
