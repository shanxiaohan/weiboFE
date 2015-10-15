<?php
	header("Content-Type:text/json; charset=utf-8");
	ini_set('display_errors', false);       //设置服务器不显示
	//header("Content-Type: application/json");

	//$topic_id=$_GET["topic_id"];

	$con = mysql_connect('localhost','root','123456');
	if (!mysql_select_db("result",$con)){
		die(mysql_error());
	}
	mysql_query("set names utf8");

	if ($_SERVER['REQUEST_METHOD']=="GET"){
			emotionTrend();
			exit;
		}
	
	function emotionTrend(){
		$jsonp=$_GET["callback"];
		global $con ;
		$topic_id=$_GET['topic_id'];
		$sql="SELECT `time_point`, `count_t_0`,`count_t_1`,`count_t_2` FROM `result_tendency_info` where `topic_id`=$topic_id and `count_t`!=0";
		$res=mysql_query($sql, $con);
		
		
		$resArr= array();
		$tmp=array();
		while ( $row =mysql_fetch_row($res) ){
			
			$tmp=array("time_point"=>$row[0],"negative"=>(int)$row[1],"neutral"=>(int)$row[2] ,"positive"=>(int)$row[3]);
			array_push($resArr, $tmp);
	}

	
		$trendArr["emotionTrend"]=$resArr;
		
		$jsonArr0=json_encode($trendArr);

		$jsonArr=$jsonp.'('.$jsonArr0.')';

		echo $jsonArr;
		return;

	}

	mysql_close($con);