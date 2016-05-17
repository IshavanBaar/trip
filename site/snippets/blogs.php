<?php 

$blogs = page('blogs')->children()->visible()->limit(200);

foreach($blogs as $blog): 
    $blog_title = $blog->title()->html();
    $blog_text = $blog->blog()->kirbytext()->excerpt(300); //now takes excerpt of first 300 chars.
    $blog_main_image = $blog->image((string)$blog->main_image())->url();
    $blog_url = $blog->url();
?>
    
    <!-- INFO WINDOW -->
    <div class="infowindow" style="display: none;">
        <div id="siteNotice"></div>
        <a href="<?php echo $blog_url ?>">
            <!-- MAIN IMAGE AND TITLE -->
            <img src="<?php echo $blog_main_image ?>" alt="">
            <h2 class="caption"><?php echo $blog_title ?></h2>
            
            <!-- MAIN CONTENT -->
            <div id="bodyContent">
                <p><?php echo $blog_text; ?></p>
            </div>
        </a>
        

    </div>

<?php endforeach ?>
