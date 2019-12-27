<template>
	<div class="footer">
		<ul>
			<router-link tag="li" active-class='active' to="/index?isShare=true">
				<img class="ncheck" src="../../../assets/img/home2.png" alt="" />
				<img class="ycheck" src="../../../assets/img/home1.png" alt="" />
				<p>首页</p>
			</router-link>
			<router-link tag="li" active-class='active' to="/rank">
				<img class="ncheck" src="../../../assets/img/rank2.png" alt="" />
				<img class="ycheck" src="../../../assets/img/rank1.png" alt="" />
				<p>排行榜</p>
			</router-link>
			<router-link tag="li" active-class='active' to="/personal">
				<img class="ncheck" src="../../../assets/img/user2.png" alt="" />
				<img class="ycheck" src="../../../assets/img/user1.png" alt="" />
				<p>我的</p>
			</router-link>
			<!--<router-link tag="li" active-class='active' to="/user">
				<i class="iconfont icon-Personalcenter_unch"></i>
				<p>个人中心</p>
			</router-link>-->
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'FooterBar',
		data() {
			return {
				msg: ''
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	ul {
		background-color: #fff;
		list-style-type: none;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		text-align: center;
		height: 45px;
		margin: 0;
		padding: 0;
		border-top: 1px solid #e6e6e6;
		li {
			flex: 1;
			color: #333333;
			font-size: 12px;
			p {
				font-size: 12px;
			}
		}
	}
	ul li p{
		margin: 0;
		font-size: 12px;
		color: #828183;
	}
	.ncheck{
		display: block;
		width: 18px;
		height: 18px;
		margin: auto;
	}
	.ycheck{
		width: 18px;
		height: 18px;
		display: none;
	}
	li.active {
		i.iconfont,
		p {
			color: #e02c17;
		}
	}
	li.active .ncheck{
		display: none;
	}
	li.active .ycheck{
		display: block;
		margin: auto;
	}
	/*li.active*/
	
	.footer {
		position: fixed;
		width: 100%;
		left: 0;
		bottom: 0;
		z-index: 999;
	}
</style>