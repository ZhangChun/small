/*背景音乐*/
  startBackMusic('./images/music.mp3', 'myAudio', 'musio_btn', function(res){
    if (res.status === 2) {//音乐开始播放回调
        $("#musio_btn").show();
      } else if (res.status === 1) {//播放回调
        $("#musio_btn").removeClass("on");
      } else {//暂停回调
        $("#musio_btn").addClass("on");
      }
  });
  /*背景音乐兼容安卓和苹果系统*/
  function startBackMusic(mp3Url, myAudio, clickBtn, callback) {
    isSystem(function(res){
      if (res.isiOS) {
        audioMusic(myAudio, clickBtn, function(res){ callback(res); });
      } else {
        audioContextMusic(mp3Url, clickBtn, function(res){ callback(res); });
      }  
    });  
  }
  //判断当前手机系统（Android/ios） 
  function isSystem(callback) {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    callback({isAndroid: isAndroid, isiOS: isiOS});  
  }
  //audio播放音乐
  function audioMusic(audio, clickBtn, callback) {
    var audio = document.getElementById(audio);
    var clickBtn = document.getElementById(clickBtn);
    audio.play();
    document.addEventListener("WeixinJSBridgeReady", function () {
      audio.play();
    }, false);
    callback({status: 2});
    clickBtn.onclick = function(){
      if (audio.paused) {
        audio.play();
        callback({status: 1});
      } else { 
        audio.pause(); 
        callback({status: 0});
      }
    }  
  }
  //audioContext播放音乐
  function audioContextMusic(mp3Url, clickEle, callback){
    var audioContext;
    var audioBufferSourceNode;
    var analyser;
    var clickBtn = document.getElementById(clickEle);
    window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
    audioContext = new window.AudioContext();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    loadAudioFile(mp3Url);
    function loadAudioFile(url) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = 'arraybuffer';
      xhr.onload = function(e) {
        decodecFile(this.response);
      };
      xhr.send();
    }
    function decodecFile(fileContent) {
      audioContext.decodeAudioData(fileContent, function(buffer) {
        start(buffer);
      });
    }
    function start(buffer) {
      if(audioBufferSourceNode) { audioBufferSourceNode.stop(); }
      audioBufferSourceNode = audioContext.createBufferSource();
      audioBufferSourceNode.connect(analyser);
      analyser.connect(audioContext.destination);
      audioBufferSourceNode.buffer = buffer;
      audioBufferSourceNode.loop = true;
      audioBufferSourceNode.start(0);
      callback({status: 2});
    }
    clickBtn.onclick=function(){
      if (audioContext.state === "suspended") {
        audioContext.resume();
        callback({status: 1});
      } else if (audioContext.state === "running") {
        audioContext.suspend();
        callback({status: 0});
      }
    }
  }