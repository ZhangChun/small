<template>
	<div class="warp">
		<div class="header">
			<div class="head1">
				<img class="userImg" :src="users.avatar" alt="" />
				<div class="inline">
					<div class="inline1">{{users.nickname}}</div>
					<div class="inline2">{{count}}个作品</div>
				</div>
			</div>
			<div class="flex">
				<div class="flexs">
					<div class="f1">{{users.like}}</div>
					<div class="f2">关注的作品</div>
				</div>
				<div class="flexs">
					<div class="f1">{{users.by_like}}</div>
					<div class="f2">我的投票</div>
				</div>
			</div>
		</div>
		<!-- 作品列表 -->
		<div class="title">
			<div class="left">作品集</div>
			<div class="right" @click="edit(isEdit)">
				{{isEdit?'取消':'编辑'}}
			</div>
		</div>
		<div class="lists">
			<div class="flex1">
				<div class="boxs" v-for="(item,index) in lists1" :key="index">
					<img class="del" src="../assets/img/del.png" alt="" v-show="isEdit" @click="del(item.id,1,index)"/>
					<div class="item">
			            <img :src="item.img_url" alt="" @click="linkDetail(item.id)">
			            <div class="l1" :class="{befo:item.pro_name.length > 20}">
			            	{{item.pro_name}}
			            </div>
			            <div class="l2">
			            	<div class="l2_1">{{item.name}}</div>
			            	<div class="l2_2">
			            		<img class="like" src="../assets/img/zan1.png" alt=""/> 
			            		<!--<img class="like" src="../assets/img/zan2.png" alt="" v-show="item.check==0"/>--> 
			            		<span>{{item.like}}</span>
			            	</div>
			            </div>
			        </div>
				</div>
			</div>
			<!--<div class="flex2">
				<div class="boxs" v-for="(item,index) in lists2" :key="index">
					<img class="del" src="../assets/img/del.png" alt="" v-show="isEdit" @click="del(item.id,2,index)"/>
					<div class="item">
			            <img :src="item.img_url" alt="" @click="linkDetail(item.id)">
			            <div class="l1" :class="{befo:item.desc.length > 20}">
			            	{{item.desc}}
			            </div>
			            <div class="l2">
			            	<div class="l2_1">{{item.name}}</div>
			            	<div class="l2_2">
			            		<img class="like" src="../assets/img/zan1.png" alt=""/> 
			            		<span>{{item.like}}</span>
			            	</div>
			            </div>
			        </div>
				</div>
			</div>-->
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		name: 'search',
		data() {
			return {
				msg: '我的',
				lists1:[],
				lists2:[],
				users:{},
				count: 0,
				isEdit: false,
			}
		},
		mounted:function(){
			console.group('mounted 挂载结束状态===============》');
			//  获取地址栏的userid 存入本地
			let userid = localStorage.getItem('userid')
			//  默认为最新的数据
			let _this = this;
			axios.post(this.apiUrl.urls+'/centre', {
			    userid: userid
			}).then(function (res) {
				console.log('ressssssssss',res)
				_this.count = res.data.extra.count;
				_this.lists1 = res.data.data;
//				for(let i=0;i<=res.data.data.length;i+=2){
//		        	if(res.data.data[i]){
//		        		_this.lists1.push(res.data.data[i]);
//		        	}
//		        	if(res.data.data[i+1]){
//		        		_this.lists2.push(res.data.data[i+1]);
//		        	}
//		       	}
		        _this.users = res.data.extra.data;
			}).catch(function (error) {
			    console.log(error);
			});
		},
		methods: {
			edit(isEdit){
				this.isEdit = isEdit?false:true;
			},
			del(id,type,index){
				let _this = this;
				this.$confirm('确定要删除吗?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          	axios.post(this.apiUrl.urls+'/delete', {
					    id: id,
					}).then(function (res) {
					    if(res.data.code == 1){
					    	if(type == 1){
					    		_this.lists1.splice(index, 1); 
					    	}else{
					    		_this.lists2.splice(index, 1);
					    		if(_this.lists1.length == 2){
					    			_this.lists2.push(_this.lists1[1]);
					    			_this.lists1.splice(1, 1); 
					    		}
					    	}
					    	_this.$message({showClose: true,message: '删除成功!'});
					    	_this.isEdit = false;
					    }
					}).catch(function (error) {
					    console.log(error);
					});
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消删除'
		          });          
		        });
			},
			linkDetail(id){
				this.$router.push({name:'details',query: {id:id,type:'personal'}})
			}
		},
	}
</script>

<style lang="less" scoped>
	.warp{
		padding-bottom: 50px;
	}
	.header {
		width: 100%;
		height: 175px;
		background-image: url(../assets/img/quan.png);
		background-size: cover;
		border-bottom: 1px solid #EEEEEE;
		.head1 {
			padding: 28px 0 23px 14px;
			box-sizing: border-box;
			.userImg {
				width: 60px;
				vertical-align: middle;
			}
			.inline {
				padding-left: 18px;
				vertical-align: middle;
				.inline1 {
					font-size: 16px;
					color: #333333;
					font-family: Source Han Sans CN;
				}
				.inline2 {
					font-size: 13px;
					color: #666666;
					padding-top: 7px;
				}
			}
		}
		.flex {
			width: 100%;
			display: flex;
			.flexs {
				flex: 1;
				text-align: center;
				.f1 {
					font-size: 18px;
					color: #333333;
				}
				.f2 {
					padding-top: 5px;
					font-size: 13px;
					color: #999999;
				}
			}
		}
	}
	.title{
		width: 100%;
		padding: 0 14px 15px 14px;
		margin-top: 21px;
		box-sizing: border-box;
		display: flex;
		.left{
			flex: 1;
			color: #333333;
			font-size: 15px;
			font-family:Source Han Sans CN;
			font-weight:bold;
			letter-spacing: 2px;
		}
		.right{
			flex: 1;
			text-align: right;
			font-size: 13px;
			color: #999999;
		}
	}
	.lists {
	    width: 100%;
	    display: flex;
	    .flex1{
	    	flex: 1;
	    	display: flex;
	    }
	    .flex2{
	    	flex: 1;
	    }
	    .boxs{
	    	width: 50%;
	    	padding: 7px;
	    	position: relative;
	    	.del{
	    		width: 17px;
	    		position: absolute;
	    		right: 0;
	    		top: 0;
	    	}
	    }
	    .boxs:nth-child(odd){
	    	padding-left: 12px;
	    }
	    .boxs:nth-child(even){
	    	padding-right: 12px;
	    }
	    /*.flex1 .boxs{
	    	padding-left: 12px;
	    }
	    .flex2 .boxs{
	    	padding-right: 12px;
	    }*/
	    .item {
		    background: #fff;
		    border-radius: 8px;
		    box-shadow: 0px 0px 8px #cac9c9;
		    img{width:100%;border-radius: 5px;}
		    .l1{
		    	max-height: 36px;
		    	line-height: 19px;
		    	padding: 0 6px;
		    	padding-top: 7px;
		    	font-size: 13px;
		    	color: #333333;
		    	overflow: hidden;
		    	position: relative;
		    }
		    .befo:after{
		    		content: '...';
		    		width: 30px;
		    		height: 19px;
		    		font-weight: bold;
		    		background: #fff;
		    		padding-left: 3px;
		    		box-sizing: border-box;
		    		position: absolute;
		    		right:0;
		    		bottom:0;
		    		z-index: 5;
		    	}
		    .l2{
		    	display: flex;
		    	font-size: 12px;
		    	color: #999999;
		    	padding: 14px 6px 10px 6px;
		    	.l2_1{
		    		flex: 1;
		    	}
		    	.l2_2{
		    		img{
		    			width: 10px;
		    			vertical-align: middle;
		    		}
		    		span{
		    			vertical-align: middle;
		    		}
		    	}
		    }
		}
	}
</style>