<?php
	header("Content-Type:text/json; charset=utf-8");
	ini_set('display_errors', false);       //设置服务器不显示

	//$topic_id=$_GET["topic_id"];

	$con = mysql_connect('localhost','root','123456');
	if (!mysql_select_db("result",$con)){
		die(mysql_error());
	}
	mysql_query("set names utf8");

	if ($_SERVER['REQUEST_METHOD']=="GET"){
			getContent();
			exit;
		}
	
	function getContent(){
		$jsonp=$_GET["callback"];
		global $con;
		$topic_id=$_GET['topic_id'];
		//$sql="SELECT `emotion_score` FROM `base_info` where `topic_id`=$_POST['topic']";
		$sql="SELECT `content` FROM `result_weibo` where `topic_id`=$topic_id";
		$res=mysql_query($sql, $con);
		$row = mysql_fetch_array($res);
		
		$resArr=array();
		$resArr["content"]=$row['content'];
		
		$jsonArr0=json_encode($resArr);

		$jsonArr=$jsonp.'('.$jsonArr0.')';

		echo $jsonArr;
		return;

	}

	mysql_close($con);