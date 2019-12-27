<template>
	<div class="wapper">
		<div class="zhe" v-if="isShow"></div>
		<div class="popup" v-if="isShow">
			<div class="title">提示</div>
			<div class="content">
				{{content}}
			</div>
			<div class="flex">
				<div class="fx" @click="comfirm()">
					确定
				</div>
				<div class="fx" @click="close()">
					取消
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:'popup',
		data() {
			return {
				isShow: true,
				vals: 'this.$emit("childValue",this.vals),childValue==方法名'
			}
		},
		// 接收父组件传过来的值
		props: {
		 	content: String,
      		required: true
		},
		methods:{
			comfirm: function(){
				this.isShow = false;
				console.log("this.vals",this.vals)
				// 向父组件传值
				this.$emit('childValue',this.vals)
			},
			close: function() {
				this.isShow = false;
			},
		}
	}
</script>

<style lang="less" scoped>
	.zhe{
		width: 100%;
		height: 100%;
		background: black;
		opacity: 0.5;
		position: fixed;
		top: 0;
		left: 0;
	}
	.popup{
		width: 80%;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		background: #fff;
		.title{
			width: 100%;
			height: 40px;
			line-height: 40px;
			text-align: center;
		}
		.content{
			width: 100%;
			padding: 10px;
			padding-bottom: 20px;
			box-sizing: border-box;
		}
		.flex{
			width: 100%;
			height: 50px;
			line-height: 50px;
			border-top: 1px solid #ddd;
			display: flex;
			.fx{
				width: 50%;
			}
			.fx:last-child{
				border-left: 1px solid #ddd;
			}
		}
	}
</style>