<?php 

$blogs = page('blogs')->children()->visible()->limit(200);

foreach($blogs as $blog): 
    $blog_title = $blog->title()->html();
    $blog_text = $blog->blog()->kirbytext()->excerpt(300); //now takes excerpt of first 300 chars.
    $blog_main_image = $blog->image((string)$blog->main_image())->url();
    $blog_url = $blog->url();
    $blog_author = $blog->user();
?>
    
    <!-- INFO WINDOW -->
    <div class="infowindow" style="display: none;">
        <div id="siteNotice"></div>
        
        <!-- MAIN IMAGE AND TITLE -->
        <img src="<?php echo $blog_main_image ?>" alt="">
        
        <!-- AUTHOR -->
        <p><?php echo $blog_author; ?></p>
        
        <!-- TITLE (now link) -->
        <a href="<?php echo $blog_url ?>">
            <h2 class="caption"><?php echo $blog_title ?></h2>
        </a>
        
        <!-- MAIN CONTENT -->
        <div id="bodyContent">
            <p><?php echo $blog_text; ?></p>
        </div>

    </div>

<?php endforeach ?>
