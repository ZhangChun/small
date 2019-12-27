<template>
	<div class="warp">
		<div class="header">
			<div class="head1" @click="select">
				<img src="../assets/img/camera.png" alt="" />
				<div class="upload">上传</div>
				<input hidden class="files" accept="video/*" type="file" multiple id="file" ref="file"/>
				<video class="imgs" v-for='(video, key) in selectList' controls>
		  			<source :src="getObjectURL(video.file)" type="video/mp4">
		  		</video>
			</div>
			<div class="head2">
                	投稿作品需包含击掌元素，mp4格式，时长5s-1min内，横竖版均可，建议视频大小控制在10M以内
			</div>
		</div>
		<div class="box">
			<div class="row">
				<div class="r1">拍摄者名称：</div>
				<div class="r2"><input type="text" placeholder="请填写企业微信名，格式为zhansan(张三)" v-model="datas.name" onkeyup="value=value.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g,'')"/></div>
			</div>
			<div class="row">
				<div class="r1">作品名称：</div>
				<div class="r2"><input type="text" placeholder="请填写作品名称" v-model="datas.pro_name" onkeyup="value=value.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g,'')"/></div>
			</div>
			<div class="row">
				<div class="r1">介绍：</div>
				<div class="r2"><textarea class="area" name="" placeholder="输入说明文字..." v-model="datas.desc" onkeyup="value=value.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g,'')"></textarea></div>
			</div>
		</div>
		<div class="loading" v-loading="loading" v-if="loading"><div class="per">{{per}}%</div></div>
		<div class="fabu">
			<button class="btn" @click="Release()">发布</button>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		name: 'HelloWorld',
		data() {
			return {
				msg: '发布',
				loading: false,
				per: 0,
				isFabu: false,
				videoUrl: '',
				delay: true, // 延迟
				datas:{
					img_url:'', //图片地址
					video:'',
					pro_name:'', //作品名称
					name:'', //拍摄者名称
					desc:'', // 介绍
					userid: 0, // 用户id
				},
				pickerOptions1: {
		          disabledDate(time) {
		            return time.getTime() > Date.now();
		          },
		       },
		        upLoadUrl: 'https://game.flyh5.cn/game/wx7c3ed56f7f792d84/ljy_wzyh_2/public/index.php/api/oss/upload_2',//上传接口地址
		        maxImageZhang: 1,//最大可以上传图片数量
      			maxVideoZhang: 1,//最大可以上传视频数量
		      	FormData: new FormData(),//序列化表单数据
		      	curType: 2,//1为选择图片，2为选择视频
		      	selectList: [],//当前选择的图片/视频
		      	allSize: 0,//选择图片/视频的总大小
			    files: ''
			}
		},
		mounted: function() {
			console.group('mounted 挂载结束状态===============》');
			this.datas.classify_id = this.$route.query.id;
			this.datas.userid = localStorage.getItem('userid');
		},
		methods: {
			fabu() {
				this.isFabu = true;
			},
			close() {
				this.isFabu = false;
			},
			//选择图片/视频
		    select(e) {
		      let _this = this
		      let file = this.$refs.file
		      e.target.dataset.type != 0 && (this.curType = e.target.dataset.type)
		      console.log('aaaaa')
		      file.click()
		      file.addEventListener('change', function () {
		        let _allSelect = this.files
		        let _max = (_this.curType == 1 ? _this.maxImageZhang : _this.maxVideoZhang)
		        let _num = Math.min(_allSelect.length, _max - _this.selectList.length)
		        for (let i = 0; i <_num; i++) {
		          _this.selectList.push({file: _allSelect[i]})
		        }
		        console.log('thissssssssss',_this.selectList)
		        file.value = ''
		      })
		    },
		    //获取本地预览图片
		    getObjectURL(file) {
		      var url = null
		      if (window.createObjectURL != undefined) { // basic
		        url = window.createObjectURL(file)
		      } else if (window.URL != undefined) { // mozilla(firefox)
		        url = window.URL.createObjectURL(file) 
		      } else if (window.webkitURL != undefined) { // webkit or chrome
		        url = window.webkitURL.createObjectURL(file) 
		      }
		      return url 
		    },
		    // 发布作品信息
		    Release(){
		    	console.log('datassssssssss',this.datas,this.videoUrl)
		    	let reg = this.datas;
		    	let _this = this;
		    	console.log('this.selectListtttt',this.selectList[0].file,this.selectList.length)
		    	if(!this.selectList.length){
		    		if(this.delay){
		    			this.$message({showClose: true,message: '请上传视频！'});
		    			this.delay = false;
						this.timeOut();
		    		}
					return ;
				}
				if(!reg.name){
					if(this.delay){
				        this.$message({showClose: true,message: '拍摄者名称不能为空！'});
				        this.delay = false;
						this.timeOut();
					}
					return ;
				}
				if(!reg.pro_name){
					if(this.delay){
				        this.$message({showClose: true,message: '作品名称不能为空！'});
				        this.delay = false;
						this.timeOut();
					}
					return ;
				}
				if(!reg.desc){
					if(this.delay){
				        this.$message({showClose: true,message: '介绍不能为空！'});
				        this.delay = false;
						this.timeOut();
					}
					return ;
				}
				// 正在上传中 禁止重复点击
		    	if(this.loading){
		    		return ;
		    	}
		    	_this.loading = true;
				let xhr = new XMLHttpRequest()
			      for (let i = 0; i < this.selectList.length; i++) {
			        this.allSize += this.selectList[i].file.size / 1024 / 1024
			        this.FormData.append('file', this.selectList[i].file) 
			      }
			      xhr.onreadystatechange = e => {//上传成功/失败回调
			        if(xhr.readyState == 4){
			          if (xhr.status == 200) {
			            console.log("【上传成功】")
			            console.log('xhrrrrrrr',xhr)
			            _this.loading = false;
			            var res = JSON.parse(xhr.response);
			            _this.datas.video = res.data.video;
			            _this.datas.img_url = res.data.img_url;
//			            this.imgs = []
						//  发布作品
						axios.post(this.apiUrl.urls+'/make', {
							video: _this.datas.video,
						    img_url: _this.datas.img_url,
						    pro_name: _this.datas.pro_name,
						    name:_this.datas.name,
						    desc:_this.datas.desc,
						    userid:_this.datas.userid
						}).then(function (res) {
							console.log('ressssssssss',res)
							if(res.data.code == 1){
//								this.$message({showClose: true,message: '发布成功!'});
								localStorage.setItem("isFabu",true);
								_this.$router.replace({name:'index',query: {isShare:true}})
							}
							
						}).catch(function (error) {
						    console.log(error);
						});
			          } else {
			            console.log("【上传失败】")
			            console.log(xhr.responseText)
			            console.log("上传失败")
			            this.FormData = new FormData()
			          }
			        }
			      }
			      xhr.upload.addEventListener("progress", evt => {//监听上传进度
			        if (evt.lengthComputable) {
			          var percentComplete = evt.loaded / evt.total
//			          console.log(`上传中${parseInt(percentComplete * 100)}%`, true, true)
//			          console.log("【上传进度】", parseInt(percentComplete * 100) + "%")
						// 动态进度条
			          _this.per = parseInt(percentComplete * 100);
			        }
			      }, false)
			      xhr.open("post", this.upLoadUrl, true)
			      xhr.send(this.FormData)
		    },
		    timeOut:function(){
		    	console.log('aaaaaa')
		    	let _this = this;
		    	setTimeout(function(){
					_this.delay = true;
				}, 2800)
		    }
		},

	}
</script>

<style scoped lang="less">
	.warp{
		width: 100%;
		height: 100%;
	}
	.loading{
		width: 100%;
	    height: 100px;
	    line-height: 100px;
	    text-align: center;
	    color: black;
	    top: 50%;
	    transform: translateY(-50%);
	    position: fixed !important;
	    z-index: 20;
	    .per{
	    	width: 100%;
	    	height: 100px;
		    line-height: 100px;
		    text-align: center;
		    color: black;
		    position: absolute;
		    top: 0;
		    left: 0;
		    z-index: 100000;
	    }
	}
	.header{
		width: 100%;
		padding: 14px;
		padding-bottom: 19px;
		border-bottom: 1px solid #EEEEEE; /*no*/
		box-sizing: border-box;
		display: flex;
		
		.head1{
			width: 132px;
			height: 132px;
			background: #F0F0F0;
			text-align: center;
			padding-top: 40px;
			border-radius: 8px;
			box-sizing: border-box;
			position: relative;
			overflow: hidden;
			.files{
				width: 100%;
				height: 132px;
				position: absolute;
				top: 0;
				left: 0;
				z-index: 10;
				opacity: 0;
			}
			.imgs{
				width: 100%;
				max-height: 100%;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%,-50%);
				object-fit: cover;
			}
			img{
				width: 38px;
			}
			.upload{
				font-size: 13px;
				color: #333333;
				padding-top: 4px;
			}
		}
		.head2{
			flex: 1;
			padding-left: 12px;
			padding-top: 20px;
			font-size:13px;
			font-family:Source Han Sans CN;
			font-weight:400;
			color: #999999;
			line-height:24px;
			letter-spacing: 1px;
			word-break:break-all;
		}
	}
	.box{
		padding: 18px 16px 0 12px;
		box-sizing: border-box;
		.row{
			width: 100%;
			padding-bottom: 14px;
			display: flex;
			.r1{
				width: 90px;
				line-height: 40px;
				font-size: 14px;
				color: #999999;
			}
			.r2{
				flex: 1;
				input{
					width: 100%;
					height: 40px;
					line-height: 40px;
					border-radius: 4px;
					border: 1px solid #BFBFBF; /*no*/
					font-size: 16px;
					padding: 0 10px;
					outline: none;
					box-sizing: border-box;
				}
				::-webkit-input-placeholder{
					font-size: 13px;
					color: #666666;
				}
				input:focus::-webkit-input-placeholder {
				color: transparent;
				/* transparent是全透明黑色(black)的速记法，即一个类似rgba(0,0,0,0)这样的值 */
				}
				textarea:focus::-webkit-input-placeholder {
				color: transparent;
				/* transparent是全透明黑色(black)的速记法，即一个类似rgba(0,0,0,0)这样的值 */
				}
				textarea{
					width: 100%;
					height: 130px;
					padding: 10px;
					outline: none;
					font-size: 16px;
					border-radius: 5px;
					border: 1px solid #BFBFBF; /*no*/
					box-sizing: border-box;
				}
			}
		}
	}
	.fabu{
		width: 100%;
		padding: 0 48px;
		padding-top: 30px;
		box-sizing: border-box;
		.btn{
			width: 100%;
			height: 40px;
			/*background: linear-gradient(to bottom, #FF3636 0%,#FD4C4D 100%);*/
			background:linear-gradient(-90deg,rgba(255,54,54,1),rgba(253,76,77,1));
			background: -webkit-linear-gradient(-90deg,rgba(255,54,54,1),rgba(253,76,77,1));
		    background: -o-linear-gradient(-90deg,rgba(255,54,54,1),rgba(253,76,77,1));
		    background: -ms-linear-gradient(-90deg,rgba(255,54,54,1),rgba(253,76,77,1));
		    box-shadow: 0px 0px 10px #f8d0d0;
			border: none;
			color: #fff;
			border-radius: 20px;
			outline: none;
		}
	}
</style>