<template>
	<div class="warp">
		<div class="header">
			<div class="heads">
				<div class="head1">
					<img class="userImg" :src="users.avatar" alt="" />
					<div class="inline">{{users.nickname}}</div>
				</div>
				<div class="flex">
					<div class="flexs">
						<div class="f1">关注的作品</div>
						<div class="f2">{{users.like}}</div>
					</div>
					<div class="flexs">
						<div class="f1">我的投票</div>
						<div class="f2">{{users.by_like}}</div>
					</div>
				</div>
			</div>
		</div>
		<!--<div class="tab">
			<div class="tabs">
				<div class="li" :class="{active:current==1}" @click="tab(1)">人物</div>
				<div class="li" :class="{active:current==2}" @click="tab(2)">风景静物</div>
				<div class="li" :class="{active:current==3}" @click="tab(3)">创意</div>
			</div>
		</div>-->
		<div class="rank">
			<div class="list">
				<div style="text-align: center;color: #333333;padding: 10px;" v-if="!lists.length">暂无数据</div>
				<div class="li" v-for="(item,index) in lists" :key="index" @click="linkDetail(item.id)">
					<div class="index" v-if="index<3">
						<img src="../assets/img/No1.png" alt="" v-show="index==0"/>
						<img src="../assets/img/No2.png" alt="" v-show="index==1" />
						<img src="../assets/img/No3.png" alt="" v-show="index==2" />
					</div>
					<div class="index" v-if="index>2">
						{{index+1}}
					</div>
					<div class="content">
						<img class="userImg" v-lazy="item.avatar" alt="" />
						<div class="inline">{{item.nickname}}</div>
					</div>
					<div class="num">
						{{item.like}}
					</div>
				</div>
			</div>
		</div>
		<div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="40"></div>
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		name: 'recomed',
		data () {
		    return {
		      msg: '排行榜',
		      lists:[],
		      pageCount: 0, // 总页数默认为0
				pages: 1, //当前页数
				types: 1,
		      current: 1, //选项卡 默认为第一个
		      users:{}, // 用户数据
		    }
		},
		mounted:function(){
			let userid = localStorage.getItem('userid');
			// 默认加载第一个
			// 如果是从详情页跳转回来 获取地址栏参数
			var id = 1;
			if(this.$route.query.type){
				id = this.$route.query.type;
				this.current = this.$route.query.type;
			}
			let _this = this;
			axios.post(this.apiUrl.urls+'/rank', {
			    page: 1,
//			    type: id,
			    userid: userid
			}).then(function (res) {
			    _this.lists = res.data.data;
		        _this.pageCount = res.data.extra.count > 0 ? ((res.data.extra.count < 10) ? 1 : ((res.data.extra.count % 10) ? (parseInt(res.data.extra.count / 10) + 1) : (res.data.extra.count / 10))) : 0;
				_this.users = res.data.extra.user;
			}).catch(function (error) {
			    console.log(error);
			});
		},
		methods:{
			tab(index){
				// 判断重复点击
				if(this.current != index){
					this.current = index;
					this.types = index;
					let userid = localStorage.getItem('userid');
					let _this = this;
					axios.post(this.apiUrl.urls+'/rank', {
					    page: 1,
					    limit: 10,
					    type: index,
					    userid: userid
					}).then(function (res) {
					    _this.lists = res.data.data;
					    _this.pages = 1;
				        _this.pageCount = res.data.extra.count > 0 ? ((res.data.extra.count < 10) ? 1 : ((res.data.extra.count % 10) ? (parseInt(res.data.extra.count / 10) + 1) : (res.data.extra.count / 10))) : 0;
					}).catch(function (error) {
					    console.log(error);
					});
				}
			},
			linkDetail(id){
		  		this.$router.push({name:'details',query: {id:id,type:'rank',ids:this.current}})
		  	},
			loadMore: function() {
			    if(this.pages < this.pageCount){
		      		this.pages++;
		      		// 加载更多数据
		  			let userid = localStorage.getItem('userid');
		  			let _this = this;
		  			axios.post(this.apiUrl.urls+'/rank', {
					    page: this.pages,
//					    type: this.types,
					    userid: userid
					}).then(function (res) {
						for(let i=0;i<res.data.data.length;i++){
							_this.lists.push(res.data.data[i]);
						}
					}).catch(function (error) {
					    console.log(error);
					});
			    }else{
			      	console.log('没有更多的数据了！')
			    }
			},
		}
	}
</script>

<style lang="less" scoped>
	.warp{
		width: 100%;
		height: 100%;
		padding-bottom: 55px;
		box-sizing: border-box;
		background: #f5f5f5;
	}
	.header{
		width: 100%;
		height: 163px;
		padding: 0 8px;
		box-sizing: border-box;
		.heads{
			width: 100%;
			height: 100%;
			background-image: url(https://game.flyh5.cn/resources/game/wechat/zcc/wz/image/rbg.png);
			background-size: 100% 100%;
			.head1{
				padding: 25px 0 15px 26px;
				box-sizing: border-box;
				.userImg{
					width: 65px;
					border-radius: 50%;
					vertical-align: middle;
				}
				.inline{
					padding-left: 21px;
					font-size: 16px;
					color: #333333;
					font-weight: bold;
					letter-spacing: 1px;
					vertical-align: middle;
				}
			}
			.flex {
				width: 100%;
				display: flex;
				.flexs {
					flex: 1;
					text-align: center;
					.f1 {
						font-size: 15px;
						color: #999999;
					}
					.f2 {
						padding-top: 5px;
						font-size: 18px;
						color: #333333;
					}
				}
				.flexs:last-child{
					border-left: 1px solid #CCCCCC; /*no*/
				}
			}
		}
	}
	.tab{
		width: 100%;
		padding: 8px 14px;
		padding-bottom: 11px;
		box-sizing: border-box;
		.tabs{
			width: 100%;
			height: 40px;
			line-height: 40px;
			text-align: center;
			background: #FFFFFF;
			border-radius: 35px;
			box-shadow: 0px 0px 8px #e5e5e5;
			padding: 0 33px;
			display: flex;
			box-sizing: border-box;
			.li{
				flex: 1;
				font-size: 15px;
				color: #333333;
				font-weight: bold;
				position: relative;
			}
			.active{
				color: #FC2122;
			}
			.active:before{
				content:'';
				width: 65%;
				height: 2px;
				border-radius: 1px;
				background: #FC2122;
				position: absolute;
				bottom: 0;
				left: 50%;
				transform: translateX(-50%);
			}
		}
	}
	.rank{
		width: 100%;
		padding: 0 14px;
		padding-top: 20px;
		box-sizing: border-box;
		.list{
			width: 100%;
			background: #fff;
			box-shadow: 0px 0px 8px #e5e5e5;
			border-radius: 5px;
			.li{
				width: 100%;
				height: 58px;
				line-height: 58px;
				display: flex;
				.index{
					width: 45px;
					text-align: center;
					img{
						width: 19px;
						vertical-align: middle;
					}
				}
				.content{
					flex: 1;
					padding-left: 10px;
					.userImg{
						width: 35px;
						height: 35px;
						border-radius: 50%;
						vertical-align: middle;
					}
					.inline{
						padding-left: 12px;
						font-size: 12px;
						color: #333333;
					}
				}
				.num{
					padding-right: 16px;
					font-size: 12px;
					color: #333333;
				}
			}
		}
	}
</style>