<template>
	<div class="wrapper bg_white" v-if="toTopFlag" @click="toTop()">
		<!--<i class="iconfont icon-top1"></i>-->
		<p class="top">顶部</p>
	</div>
</template>

<script>
	export default{
		name:'toTop',
		data() {
			return {
				toTopFlag: false
			}
		},
		methods: {
			toTop: function() {
				//获得当前高度
				let distance = document.documentElement.scrollTop || document.body.scrollTop;
				//每步的距离
				let step = distance / 50;
				(function jump() {
					if (distance > 0) {
						distance -= step;
						window.scrollTo(0, distance);
						console.log("sssssss",jump)
						setTimeout(jump, 10)
					}
				})();
			},
			handleScroll: function() {
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				var screenHeight = window.screen.height;
				console.log(scrollTop,screenHeight)
				if (scrollTop >= screenHeight) {
					this.toTopFlag = true;
				} else {
					this.toTopFlag = false;
				}
			}
		},
		mounted() {
			window.addEventListener('scroll', this.handleScroll);
		}
	}
</script>

<style>
	.top{
		position: fixed;
		right: 10px;
		bottom: 55px;
		border: 1px solid black;
		z-index: 100;
	}
</style>