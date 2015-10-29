<?php
	header("Content-Type:text/json; charset=utf-8");

	//$topic_id=$_POST['topic'];

	$con = mysql_connect('localhost','root','123456');
	if (!mysql_select_db("statistic_result",$con)){
		die(mysql_error());
	}
	mysql_query("set names utf8");

	if ($_SERVER['REQUEST_METHOD']=="GET"){
			
			map_callback();
		}
	
	//用户地图分布图
	function map_callback(){
		$jsonp=$_GET["callback"];
		global $con ;
		$topic_id=$_GET['topic_id'];
		//$sql="select * from result_province_info where topic_id=$_POST['topic']";
		$sql="select * from result_province_info where topic_id=$topic_id";
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


	mysql_close($con);
