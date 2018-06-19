var demoApp = angular.module('demoApp',[]);
demoApp.filter('paging',function(){      //paging 过滤器
  return function(lists,start){     //两个参数 lists 是在 html 里你ng-repeat的原始数据：
                                    //  start 也就是 paging 后面传的参数，即 currentPage*listsPerPage
    return lists.slice(start);     //将原始数据按照 start 分割
  };
});

demoApp.controller('demoCtrl',['$scope',function($scope){  //页面控制器
  $scope.demoLists = [                                     //模拟数据
    {name:['第1条信息','第2条信息','第3条信息','第4条信息','第5条信息','第6条信息',
   '第7条信息','第8条信息','第9条信息','第10条信息','第11条信息','第12条信息',
   '第13条信息','第14条信息','第15条信息','第16条信息','第17条信息','第18条信息',
   '第19条信息','第20条信息','第21条信息','第22条信息','第23条信息','第24条信息',
   '第25条信息','第26条信息','第27条信息','第28条信息','第29条信息','第30条信息']
   }
];
console.log($scope.demoLists)
		$scope.prev = "prev";
		$scope.next = "next";
    $scope.dataNum =  $scope.demoLists[0].name.length;  //获得数据总个数
    $scope.pages = Math.ceil($scope.dataNum/5);    //按照每页显示5个数据，得到总页数
    console.log("$scope.pages------",$scope.pages)
    $scope.pageNum = [];                                //生成页码，在 html里 ng-repeat 出来
    for(var i=0;i<$scope.pages;i++){
      $scope.pageNum.push(i);
    }
    function setPages(length, amount, num, first) {//创建保存页码数组的函数
	    //length数据总条数
	    //amount每页数据条数
	    //num保留的页码数
	    //first第一页的页码
	    console.log(length,amount,num,first,100,6,5,1)
	    var pages = []; //创建分页数组
	    var page = Math.ceil(length / amount);
	    console.log("pageeeeeee-------",page)
	    if (page <= num) {
	      for (var i = 1; i <= page; i++) {
	        pages.push(i);
	      }
	    }
	    if (page > num) {
	      for (var i = first; i < first + num; i++) {
	        pages.push(i);
	      }
	    }
	    return pages;
	  }
    $scope.currentPage = 1;                       //设置当前页是 0
    $scope.listsPerPage = 5;                      //设置每页显示 3 个
    $scope.firstPage = 1;
    $scope.pageNums = 5;
    $scope.page = 1;

    $scope.setPage = function(num){  // 当点击页码数字时执行的函数
    	var page = num;
      console.log("当前页数",num,$scope.currentPage)
      $scope.lastPage = Math.ceil($scope.dataNum / $scope.listsPerPage);
      console.log("$scope.lastPage-----",$scope.lastPage)
      if (page >= $scope.pageNums) {
          $scope.firstPage = page - Math.floor($scope.pageNums / 2);
          console.log("$scope.firstPage-----",$scope.firstPage)
        } else {
          $scope.firstPage = 1;
        }
        if ($scope.firstPage > $scope.lastPage - $scope.pageNums) {
          $scope.firstPage = $scope.lastPage - $scope.pageNums + 1;
          console.log("$scope.firstPage111----------",$scope.firstPage)
        }
        $scope.pageNum = setPages($scope.dataNum, $scope.listsPerPage, $scope.pageNums, $scope.firstPage);
        console.log("$scope.pageNum-----",$scope.pageNum)
      if(num == 'prev'){
      	if($scope.currentPage > 0){
              $scope.currentPage--;
          }
      }else if(num == 'next'){
      	if ($scope.currentPage < $scope.pages-1){
              $scope.currentPage++;
          }
      }else if(num == 0){
      	
      }else{
      	if(num <= $scope.pages){
	      	$scope.currentPage = num;                 //将当前页 设置为 页码数
	      	console.log($scope.currentPage)
	      }
      }
    }
    $scope.setPage(0)
}]);