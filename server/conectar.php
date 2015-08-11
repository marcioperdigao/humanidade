<?php
	$server="localhost";
	$user="root";
	$password="";
	$db_name="clientes";
	
	$conexao=mysql_connect($server,$user,$password) or die("Eroo ao conectar ao banco");
	$db_select=mysql_select_db($db_name,$conexao) or die("Erro ao selecionar o banco de dados");
	
	?>
	