<div class="container-fluid">

	<!-- SEARCH BAR -->
	<div id="search-bar" class="col-lg-6 col-lg-offset-3 search-results">
		<form class="search" action="">
			<div class="input-group">
				<input action="" type="search" class="form-control" placeholder="Search..." name="q" value="" required>
				<span class="input-group-btn">
				  <button class="btn btn-default btn-primary" type="submit">
				   <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
				  </button>
				</span>
			</div>
		</form>   
	</div>

	<!-- TITLE OF COLLECTION PAGE -->
	<?php if(count($results->toArray()) > 0): ?>
		<!-- TODO Styling + What happens if there are no results? -->
		<h2 class="col-xs-12"><?php echo count($results->toArray())?> Results For "<?php echo esc($query)?>"</h2>
	<?php endif ?>
	
	<!-- SEARCH RESULTS -->
	<div class="search-results teaser">
		<?php snippet('thumbnails', array('entries' => $results))?>
	</div>
</div>