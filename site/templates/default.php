<?php snippet('header') ?>

	<div class="container text" role="main">
	  <h1><?php echo $page->title()->html() ?></h1>
	  <?php echo $page->text()->kirbytext() ?>
	</div>

<?php snippet('footer') ?>