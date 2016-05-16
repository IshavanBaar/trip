<div class="container-fluid">
	<!-- TITLE OF COLLECTION PAGE -->
	<h2 class="col-xs-12"><?php echo page('recently-added')->title()->html() ?></h2>
	
	<!-- RECENTLY ADDED TECHNIQUES -->
	<?php $recently_added = page('recently-added')->children()->visible()->limit(100);?>
	<?php snippet('thumbnails', array('entries' => $recently_added))?>
</div>