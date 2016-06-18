<?php 

// Gets the part of the string between start string and end string.
function get_string_between($string, $start, $end){
    $string = ' ' . $string;
    $ini = strpos($string, $start);
    if ($ini == 0) return '';
    $ini += strlen($start);
    $len = strpos($string, $end, $ini) - $ini;
    return substr($string, $ini, $len);
}

// Removes the ', \n, or spaces that a string might still have have.
function clean($string) {
    $string = str_replace("'", "", $string);
    $string = str_replace("\n", "", $string);
    $string = str_replace(" ", "", $string);
    return $string;
}

// Get all visible blogs.
$blogs = page('blogs')->children()->visible()->limit(200);

// For each blog, get the information from the fields.
foreach($blogs as $blog): 
    $blog_avatar = kirby()->urls()->avatars() . "/" . $blog->user()->avatar() . ".png";
    $blog_url = $blog->url();

    $blog_title = strtoupper($blog->title()->html());
    $blog_main_image = $blog->image((string)$blog->main_image())->url();
    $blog_text = $blog->blog()->kirbytext(); //->excerpt(300); //for excerpt of first 300 chars.

    $blog_author = $blog->user();
    $blog_date_c = $blog->date('c');
    $blog_date = $blog->date('d/m/Y'); 
    
    $location = (string) $blog->location();
    $blog_address = ucwords(get_string_between($location, 'address:', 'lat:'));     // From address to lat
    $blog_lat = clean(get_string_between($location, 'lat:', 'lng:'));               // From lat to lng
    $blog_lng = clean(substr($location, strpos($location, "g:") + 2));              // All to the end
    
?>
    <div class="infowindow-content" style="display: none;">  
        <!-- Main Image -->
        <img class="blog-header-image" src="<?php echo $blog_main_image ?>" alt="">
        
        <div class="text-center">
             <!-- Title -->
            <h2 class="blog-title"><?php echo $blog_title ?></h2>

            <img class="blog-squiggle" src="assets/images/squiggle.png" alt="">
            
            <!-- Date & Address -->
            <p class="blog-date-address"><?php echo $blog_date ?>, <?php echo $blog_address ?></p>

            <!-- Actual Text of blog-->
            <?php echo $blog_text ?>

            <!-- Items that are required, but not displayed --> 
            <p class="blog-avatar" style="display: none;"><?php echo $blog_avatar ?></p>
            <p class="blog-lat" style="display: none;"><?php echo $blog_lat ?></p>
            <p class="blog-lng" style="display: none;"><?php echo $blog_lng ?></p>
        </div>
       
        
    </div>

<?php endforeach ?>
