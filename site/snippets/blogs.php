<!-- Puts entries in thumbnails-->
<?php 

$blogs = $page('blogs')->children()->visible()->limit(200);

foreach($blogs as $blog): 
    $blog_title = $blog->title()->html();
    $blog_text = $blog->blog()->kirbytext();
    $blog_main_image = $blog->image((string)$blog->main_image());
?>

    <div id="content">
        <div id="siteNotice"></div>
        <h1 id="firstHeading" class="firstHeading"><?php echo $blog_title ?></h1>
        <div id="bodyContent">
            <p><?php echo $blog_text; ?></p>
        </div>
    </div>

<?php endforeach ?>