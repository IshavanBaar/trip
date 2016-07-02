<!-- UNACCESSIBLE FOR NOW -->
<?php go('/'); ?>

<div class="main container" role="main">
    
    <!-- MAIN IMAGE -->
    <figure>
        <img id="header_image" src="<?php echo $page->image((string)$page->main_image())->url(); ?>" alt="" class="col-xs-12">
    </figure>
    
    <!-- TITLE AND BLOG -->
    <div class="text">
        <h1><?php echo $page->title()->html(); ?></h1>
        <?php echo $page->blog()->kirbytext(); ?>
    </div>
</div>


