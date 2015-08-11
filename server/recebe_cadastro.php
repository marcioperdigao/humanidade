<?php session_start();
	include("conectar.php");
	$password=$_POST['password'];
	$user=$_POST['user'];
	
	$sql="INSERT INTO clientes(user,password) VALUES('$user','$password')";
	$query=mysql_query($sql,$conexao) or die("Impossivel realizar a query de inserssão");
	echo '<script>location.href="../jogo.php#tabs-3";</script>'; 
// ?>