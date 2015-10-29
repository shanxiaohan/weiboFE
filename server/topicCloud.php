<?php
	header("Content-Type:text/json; charset=utf-8");
	ini_set('display_errors', false);    

	


	$con = mysql_connect('localhost','root','123456');
	if (!mysql_select_db("statistic_result",$con)){
		die(mysql_error());
	}
	mysql_query("set names utf8");

	if ($_SERVER['REQUEST_METHOD']=="GET"){
			keyword_callback();
			
		}
	
	
	//关键词
	function keyword_callback(){
		//$sql="select * from result_keyword_info where topic_id=$_POST['topic']";
		global $con;
		$jsonp=$_GET["callback"];
		$topic_id=$_GET['topic_id'];
		$sql="select * from result_keyword_info where topic_id=$topic_id";
		$res=mysql_query($sql, $con);

		$resArr= array();
		$tmp=array();
		while ( $row =mysql_fetch_row($res) ){
			
			$tmp=array("name"=>$row[0],"value"=>(int)$row[1]);
			array_push($resArr, $tmp);
	}

	$cloudArr=array();
	$cloudArr["cloud"]=$resArr;
	$jsonArr0=json_encode($cloudArr);   //编码成json类型
	$jsonArr=$jsonp.'('.$jsonArr0.')';
	//$jsonArr='{"cloud":'.$jsonArr0.'}';
	//$jsonArr=$jsonp.'({"cloud":"beijing"})';
	echo $jsonArr;
	return;
	}




/*

	//用户地图分布图
	function map_callback(){
	$jsonp=$_GET["callback"];
	global $con ;
	//$sql="select * from result_province_info where topic_id=$_POST['topic']";
	$sql="select * from result_province_info where topic_id=1";
	$res=mysql_query($sql, $con);
	$resArr=array();
	$tmp=array();
	while( $row = mysql_fetch_row($res) ){
			
			$tmp=array("name"=>$row[0],"value"=>(int)$row[1]);
			array_push($resArr,$tmp);
	}
	
	$mapArr=array();
	$mapArr["mapdata"]=$resArr;
	
	$jsonArr0=json_encode($mapArr);

	$jsonArr=$jsonp.'('.$jsonArr0.')';
	echo $jsonArr;
	return;
	}

	
	*/
	
	
	
	//print_r($resArr);
	
	
	
	
	//echo $jsonArr."<br/><br/>";
	//print_r( json_decode($jsonArr));    //解码还原为数组Array
	
	//将json数据写入.json文件
//	file_put_contents('D:\myProject3\test\cloudTest.json',$jsonArr);


	mysql_close($con);
