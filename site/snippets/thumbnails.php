<!-- Puts entries in thumbnails-->
<?php foreach($entries as $technique): 
	if($technique->header_image()->isNotEmpty()):
		$image = $technique->image((string)$technique->header_image());
	else:
		$image = $technique->images()->sortBy('sort', 'asc')->first();
	endif;
?>
	<!-- THUMBNAIL LINK -->
	<div class="col-md-4 col-sm-6">
		<div class="thumbnail">
			<a href="<?php echo $technique->url() ?>">
				<!-- TODO fix if there is no gif file in the folder -->
				<img src="<?php echo $image->url();?>" alt=""
				onmouseover="play(this);" onmouseout="stop(this);">
				<p class="caption"><?php echo $technique->title()->html() ?></p>
			</a>
		</div>
	</div>
<?php endforeach ?>