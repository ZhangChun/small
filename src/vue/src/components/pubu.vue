<template>
	<div class="warp">
		<div class="lists">
			<div class="flex1">
				<div id="flex1" ref="flex1">
					<div class="boxs" v-for="(item,index) in lists1" :key="index">
						<div class="item">
		            <img class="img" v-lazy="item.img_url" alt="">
		            <div class="l1" :class="{befo:item.pro_name.length > 20}">
		            	{{item.pro_name}}
		            </div>
		            <div class="l2">
		            	<div class="l2_1">{{item.name}}</div>
		            	<div class="l2_2">
		            		<img class="like" src="../assets/img/zan1.png" alt="" v-if="item.check==1"/> 
		            		<img class="like" src="../assets/img/zan2.png" alt="" v-if="item.check==0"/> 
		            		<span>{{item.like}}</span>
		            	</div>
		            </div>
		        </div>
					</div>
				</div>
			</div>
			<div class="flex2">
				<div id="flex2" ref="flex2">
					<div class="boxs" v-for="(item,index) in lists2" :key="index">
						<div class="item">
		            <img class="img" v-lazy="item.img_url" alt="">
		            <div class="l1" :class="{befo:item.pro_name.length > 20}">
		            	{{item.pro_name}}
		            </div>
		            <div class="l2">
		            	<div class="l2_1">{{item.name}}</div>
		            	<div class="l2_2">
		            		<img class="like" src="../assets/img/zan1.png" alt="" v-if="item.check==1"/> 
		            		<img class="like" src="../assets/img/zan2.png" alt="" v-if="item.check==0"/> 
		            		<span>{{item.like}}</span>
		            	</div>
		            </div>
		        </div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
	  	name: 'HelloWorld',
	  	data () {
	    	return {
	      	msg: '首页',
	      	lists1: [],
	      	lists2: [],
	    	}
	  	},
		mounted:function(){
			let _this = this;
			let userid = localStorage.getItem('userid');
			axios.post(_this.apiUrl.urls+'/production_list', {
			    page: 1,
			    type: 1,
			    userid: userid
			}).then(function (res) {
				_this.pageCount = res.data.extra.count > 0 ? ((res.data.extra.count < 10) ? 1 : ((res.data.extra.count % 10) ? (parseInt(res.data.extra.count / 10) + 1) : (res.data.extra.count / 10))) : 0;
			    for(let i=0;i<=res.data.data.length;i+=2){
		        	if(res.data.data[i]){
		        		_this.lists1.push(res.data.data[i]);
		        	}
		        	if(res.data.data[i+1]){
		        		_this.lists2.push(res.data.data[i+1]);
		        	}
		        }
			    _this.pubu();
			    if(res.data.data.length %2 != 0){
			    	_this.pubu();
			    }
			}).catch(function (error) {
			    console.log(error);
			});
		},
		methods:{
			pubu(){
		  		let _this = this;
	  			setTimeout(function(){
					let flex1 = _this.$refs.flex1.offsetHeight;
					let flex2 = _this.$refs.flex2.offsetHeight;
			    	console.log('flexxxxxxxx',flex1,flex2)
			    	if(flex1 > flex2){
//			    		console.log(flex1,flex2)
			    		if(flex1 - flex2 > 100){
			    			let obj = _this.lists1.slice(-1);
				    		_this.lists2 = _this.lists2.concat(obj);
				    		_this.lists1 = _this.lists1.slice(0,-1)
			    		}
			    	}else if(flex2 > flex1){
			    		if(flex2 - flex1 > 100){
				    		let obj = _this.lists2.slice(-1);
				    		_this.lists1 = _this.lists1.concat(obj);
				    		_this.lists2 = _this.lists2.slice(0,-1)
			    		}
			    	}
			    	if(flex1 == 0 && flex2 == 0){
			    		_this.pubu();
			    	}
				}, 500)
		  	},
		},
	}
</script>

<style scoped lang="less">
	.lists {
    width: 100%;
    display: flex;
    padding-bottom: 50px;
    .flex1{
    	flex: 1;
    }
    .flex2{
    	flex: 1;
    }
    .boxs{
    	padding: 7px;
    }
    .flex1 .boxs{
    	padding-left: 12px;
    }
    .flex2 .boxs{
    	padding-right: 12px;
    }
    .item {
	    background: #fff;
	    border-radius: 5px;
	    box-shadow: 0px 0px 8px #cac9c9;
	    .img{width:100%;border-radius: 5px;}
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