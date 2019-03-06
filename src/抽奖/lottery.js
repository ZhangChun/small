$(function() {

	var rad = 0,
	oldRad = 0,
	index = 0;
	$(".lotteryPointer")[0].addEventListener("webkitAnimationEnd", function() {
		oldRad = rad % 360;
		console.log("oldRaddddd",oldRad)
		$(".lotteryPointer").removeClass("animation")
		$(".lotteryPointer").css({
			"transform": "rotate(" + oldRad + "deg)"
		});
	})
	$(".pageBox").on("click", ".lotteryPointer", function() {
		$(".lotteryPointer").addClass("animation");
		index = 0;
		console.log(oldRad, index)
		rad = index * 45 + 360 * 10 + 22.5;
		console.log("raddddddddddddd",rad)
		$("style").append("@keyframes myRotate{from {transform: rotate(" + oldRad + "deg);}to {transform: rotate(" + rad + "deg);}}@-webkit-keyframes myRotate{from {transform: rotate(" + oldRad + "deg);}to {transform: rotate(" + rad + "deg);}}");
	})

});