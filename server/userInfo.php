<?php
	header("Content-Type:text/json; charset=utf-8");
	ini_set('display_errors', false);       //设置服务器不显示
	//header("Content-Type: application/json");

	//$topic_id=$_GET["topic_id"];

	$con = mysql_connect('localhost','root','123456');
	if (!mysql_select_db("statistic_result",$con)){
		die(mysql_error());
	}
	mysql_query("set names utf8");

	$userInfo=array();
	
	if ($_SERVER['REQUEST_METHOD']=="GET" ){
				$jsonp=$_GET["callback"];
				$sex_info=sex_callback();
				$vip_info=vip_callback();
				$terminal_info= terminal();
				$age_info=age_callback();
				global $userInfo;
				$userInfo["sex"]=$sex_info;
				$userInfo["vip"]=$vip_info;
				$userInfo["terminal"]=$terminal_info;
				$userInfo["age"]=$age_info;
				$jsonArr0=json_encode($userInfo);
				$jsonArr=$jsonp.'('.$jsonArr0.')';
				echo $jsonArr;
				exit;

		}
		
	//用户年龄
	function age_callback(){
		
		global $con;
		$topic_id=$_GET['topic_id'];
	//$sql="SELECT `count_a_before_70`,`count_a_70`,`count_a_80`, `count_a_90`,`count_a_x` FROM `base_info` where `topic_id`=$topic_id";
		$sql="SELECT `count_a_before_70`,`count_a_70`,`count_a_80`, `count_a_90`,`count_a_x` FROM `base_info` where `topic_id`=$topic_id";
		$res=mysql_query($sql, $con);
		$row = mysql_fetch_row($res);

		$resArr=array("before_70"=>$row[0], "after_70"=>$row[1], "after_80"=>$row[2], "after_90"=>$row[3], "unknown"=>$row[4]);

		return $resArr;

	}



	//用户终端
	function terminal(){
		global $con;
		$topic_id=$_GET['topic_id'];
		//$sql="select `count_u_v`,`count_u_c`,`count_u_o` from `base_info` where `topic_id`=$topic_id";
		$sql="select `source` ,`count`  from `result_terminal` where `topic_id`=$topic_id";
	
		$res=mysql_query($sql, $con);
		//$row = mysql_fetch_row($res);

		//$resArr=array("source"=>$row[0], "credit"=>$row[1], "ordinary"=>$row[2]);


		$resArr= array();
		$tmp=array();
		while ( $row =mysql_fetch_row($res) ){
			
			$tmp=array("source"=>$row[0],"count"=>$row[1]);
			array_push($resArr, $tmp);
	}
		
		//$termArr=array();
		//$termArr["terminal"]=$resArr;
	
		return $resArr;
	
	}


	//用户注册信息【PIE】
	function vip_callback(){
		
		global $con;
		$topic_id=$_GET['topic_id'];
		//$sql="select `count_u_v`,`count_u_c`,`count_u_o` from `base_info` where `topic_id`=$topic_id";
		$sql="select `count_u_v`,`count_u_c`,`count_u_o` from `base_info` where `topic_id`=$topic_id";

		$res=mysql_query($sql, $con);
		$row = mysql_fetch_row($res);

		$resArr=array("vip"=>$row[0], "credit"=>$row[1], "ordinary"=>$row[2]);

		//$vipArr=array();
		//$vipArr["vip"]=$resArr;
	
	
		//$jsonArr0=json_encode($vipArr);

		//$jsonArr=$jsonp.'('.$jsonArr0.')';
		//echo $jsonArr;
		return $resArr;
	
	}
	
	//用户性别
	function sex_callback(){
		$jsonp=$_GET["callback"];
		global $con ;
		//$sql="select * from base_info  where topic_id=$topic_id";
		$topic_id=$_GET['topic_id'];
		$sql="select `count_g_female`,`count_g_male`,`count_g_x` from `base_info` where `topic_id`=$topic_id";
		
		$res=mysql_query($sql, $con);
		$row = mysql_fetch_row($res);

		$resArr=array("female"=>$row[0], "male"=>$row[1], "unknown"=>$row[2]);

	
		//$sexArr=array();
		//$sexArr["sex"]=$resArr;
	
	
		//$jsonArr0=json_encode($sexArr);

		//$jsonArr=$jsonp.'('.$jsonArr0.')';
		//echo $jsonArr;
		return $resArr;
		
	}
	
	mysql_close($con);
?>