<!doctype html>
<html class="no-js" lang="<?php echo $site->language() ?>">
<!DOCTYPE html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width,initial-scale=1.0">

	<title><?php echo $site->title()->html() ?> | <?php echo $page->title()->html() ?></title>
	<meta name="description" content="<?php echo $site->description()->html() ?>">
	<meta name="keywords" content="<?php echo $site->keywords()->html() ?>">

	<!-- CSS -->
	<?php echo css('assets/css/bootstrap.css') ?>
	<?php echo css('assets/css/main.css') ?>
	
	<!-- MODERNIZER FOR OLD BROWSERS -->	
	<?php echo js('assets/js/lib/modernizr-2.8.3-respond-1.4.2.min.js') ?>
	
	<?php echo js(array(
		'assets/js/lib/jquery-1.12.3.js',
		'assets/js/lib/bootstrap.min.js',
		'assets/js/main.js',
	))?>
	
</head>
<body>
	<nav class="navbar navbar-default navbar-top">
		<div class="container-fluid">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<!-- <a class="navbar-brand" href="<?php echo $site->url() ?>"><img src="<?php echo url('assets/images/logo.svg') ?>" alt="<?php echo $site->title()->html() ?>" class="img-responsive" /></a> -->
				<a class="navbar-brand" href="<?php echo url() ?>">Interaction Museum</a>
			</div>
			<?php snippet('menu') ?>
		</div>
	</nav>
