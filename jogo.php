<!DOCTYPE html>
<html>
	<head><meta charset="utf8">
		<title>Prototipo do game mais foda do mundo</title>
		<!--<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js">-->
		<script src="dinamica/levelup.js" type="text/javascript"></script>
		<script src="dinamica/drawingmobs.js" type="text/javascript"></script>
		<script src="dinamica/following.js" type="text/javascript"></script>
		<script src="dinamica/fight.js" type="text/javascript"></script>
		<script src="dinamica/mobs.js" type="text/javascript"></script>
		<script src="dinamica/createmode.js" type="text/javascript"></script>
		<script src="dinamica/tiled.js" type="text/javascript"></script>
		<script src="dinamica/houses.js" type="text/javascript"></script>
		<script src="dinamica/environment.js" type="text/javascript"></script>
		<script src="dinamica/character.js" type="text/javascript"></script>
		<script src="dinamica/bandeiras.js" type="text/javascript"></script>
        <script src="dinamica/dinamicagame.js" type="text/javascript"></script>

		
		<link rel="stylesheet" href="estilo/estilogame.css" type="text/css">
		
	</head>
	<body>
		<header>
			<nav id="menuprincipal">
				<ul>
					<li>
					<?php session_start();
							include("server/conectar.php");
							
							if(@$_SESSION['id']){
								$user=$_SESSION['user'];
								echo " Olá $user";
								
							}
							else{
								echo "
								<form id='formulario-login' action='server/autentica.php' method='post'>
									<label for='login'>login</label>
									<input type='text' id='login' name='user'>
									<label for='password'>password</label>
									<input type='password' id='password' name='password'>
									<input type='submit' value='logar'>
								</form>";
							
						?>	
						
					</li>
					
					<li id='li-cadastro'>
						<?php echo "
						<button type='button' value='Cadastro' id='cadastrando' onclick='cadastro()'>Cadastrar</button>
						<section id='cadastroFlutuante'>
							<form action='server/recebe_cadastro.php' method='post'>
								<label for='user'>Usuario</label>
								<input type='text' id='user' name='user'><br>
								<label for='password'>Senha</label>
								<input type='password' id='password' name='password' style='position:relative;left:12px;'>
								<input type='submit' value='Cadastrar'>
							</form>
							
								
						</section>
						";
							}
							?>
					</li>
					
				</ul>
			</nav>
			
		</header>
		<main>
			<section id="areadogame">

				<canvas id='game' width='1000' height='600'></canvas>
				<canvas id='workShop' width='228' height='400'></canvas>
				<?php
					$id_cliente=@$_SESSION['id'];

				?>
				
			</section>
			
		</main>
		
	</body>
</html>