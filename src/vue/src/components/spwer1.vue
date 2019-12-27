<template>
	<div class="warp">
		<div class="banner">
			<div class="block">
				<v-touch v-on:swipeleft="leftslide()" height="195px" v-on:swiperight="rightslide()">
					<div class="imgs" :class="{opa:isban!=index,opas:isban==index}" @click="poput(index)" v-for="(item,index) in lists" :key="index">
						<img class="img" :src="item.imgUrl" alt="" />
					</div>
				</v-touch>
				<div class="uls">
					<div class="lis" :class="{white:isban==index}" v-for="(item,index) in lists" :index="index" :key="index"></div>
				</div>
			</div>
			<div class="desc" @click="goHot()">更多精彩活动</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'HelloWorld',
		data() {
			return {
				msg: '轮播',
				iswel: 0, // 视频轮播初始值
				isban: 0, // banner轮播初始值
				delay: true, // 滑动延迟
				lists: [
					{imgUrl:'http://game.flyh5.cn/resources/game/cj_mini/upload/20190924/747e413d1b0f2d40871eb304bf466e8b.jpg'},
					{imgUrl:'http://game.flyh5.cn/resources/game/cj_mini/upload/20190924/dfbe66f10b96c3c4dcd02dd372082f9f.jpg'},
					{imgUrl:'http://game.flyh5.cn/resources/game/cj_mini/upload/20191112/e77cfaba892c43f3d989de812979c196.jpg'}
				]
			}
		},
		mounted: function() {
			this.timers = setInterval(this.swperss, 3800);
		},
		methods: {
			swperss(){
				if(this.isban < this.lists.length - 1){
					this.isban+=1;
				}else{
					this.isban=0;
				}
			},
			slide1(isSlide){
				clearInterval(this.timers)
				if(isSlide == 'left'){
					if(this.isban > 0){
						this.isban-=1;
					}else{
						this.isban=this.lists.length-1;
					}
				}else{
					if(this.isban < this.lists.length - 1){
						this.isban+=1;
					}else{
						this.isban=0;
					}
				}
				this.delay = false;
				this.timeOut();
				this.timers = setInterval(this.swperss, 3800);
			},
			// 延迟 禁止滑动过快
			timeOut(){
		    	let _this = this;
		    	setTimeout(function(){
					_this.delay = true;
				}, 1000)
		    },
			leftslide(){
//				console.log('左滑',data)
				if(this.delay){
					this.slide1('left')
				}
			},
			rightslide(data){
//				console.log('右滑',data)
				if(this.delay){
					this.slide1('right')
				}
			},
		}
	}
</script>

<style scope lang="less">
	.banner {
		width: 100%;
		padding: 10px 0;
		background: #f2f2f2;
		text-align: center;
		.block {
			width: 100%;
			min-height: 195px;
			margin: auto;
			position: relative;
		}
		.imgs {
			position: absolute;
			height: 195px;
			top: 0;
			left: 0;
			opacity: 0;
			.img {
				width: 100%;
				max-height: 100%;
				object-fit: cover;
			}
			.btn {
				width: 62px;
				position: absolute;
				bottom: 40px;
				right: 55px;
			}
		}
		.uls{
			width: 80%;
			height: 22px;
			position: absolute;
			bottom: 0;
			left: 50%;
			transform: translateX(-50%);
			display: flex;
			justify-content: center;
			z-index: 10;
		}
		.lis{
			width: 8px;/*no*/
			height: 8px;/*no*/
			margin: 2px;
			border-radius: 50%;
			background: rgba(0,0,0,0.4);
			box-sizing: border-box;
		}
		.white{
			background: #fff;
		}
		.vlist{
			width: 100%;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 5;
			opacity: 0;
		}
		.opa{
			opacity: 0 !important;
			transition: opacity 2.5s, transform 2.5s; 
		}
		.opas{
			opacity: 1 !important;
			transition: opacity 2.5s, transform 2.5s; 
		}
	}
</style>