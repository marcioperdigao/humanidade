<?php session_start();
	include("conectar.php");
	$password=$_POST['password'];
	$user=$_POST['user'];
	
	$sql="SELECT * FROM clientes WHERE password='$password' AND user='$user'";
	$query=mysql_query($sql,$conexao) or die("Impossivel realizar a query de inserssão") or die("ERRO AO AUTENTICAR");
	$result=mysql_fetch_array($query);
	
	$_SESSION['user']=$result['user'];
	$_SESSION['id']=$result['id'];
	// echo '<script>location.href="../jogo.php#tabs-3";</script>'; 
?>