<?php snippet('header') ?>

<?php snippet('search-papers') ?>

  <div class="main container" role="main">

    <div class="text">
      <h1><?php echo $page->title()->html() ?></h1>
      <?php echo $page->text()->kirbytext() ?>
	  <form action="<?php echo url('logout') ?>">
		<input type="submit" value="Logout">
	  </form>
    </div>

  </div>

<?php snippet('footer') ?> 