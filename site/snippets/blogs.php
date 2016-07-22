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
    $blog_uid = $blog->uid();
    
    $blog_title_lower = $blog->title()->html();
    $blog_title = strtoupper($blog->title()->html());
    $blog_main_image = $blog->image((string)$blog->main_image())->url();
    $blog_text = $blog->blog()->kirbytext(); //->excerpt(300); //for excerpt of first 300 chars.

    $blog_author = $blog->user();
    $blog_date_c = $blog->date('c');
    $blog_date = $blog->date('d/m'); 
    
    $location = (string) $blog->location();
    $blog_address = ucwords(get_string_between($location, 'address:', 'lat:'));     // From address to lat
    $blog_lat = clean(get_string_between($location, 'lat:', 'lng:'));               // From lat to lng
    $blog_lng = clean(substr($location, strpos($location, "g:") + 2));              // All to the end
    
?>
    <div class="bloglist-content" style="display: none;">
        <li>
            <span uid="<?php echo $blog_uid ?>" onclick="openPrevNextWindow(this)">
                <p class="bloglist-line bloglist-date"><?php echo $blog_date ?></p>
                <p class="bloglist-line bloglist-separator"> | </p>
                <p class="bloglist-line bloglist-title"><?php echo $blog_title_lower ?></p>
            </span>
        </li>
    </div>

    <div class="infowindow-content" 
         style="display: none;"
         uid="<?php echo $blog_uid ?>"
         avatar="<?php echo $blog_avatar ?>"
         lat="<?php echo $blog_lat ?>"
         lng="<?php echo $blog_lng ?>">
        <!-- Main Image -->
        <img class="blog-header-image" src="<?php echo $blog_main_image ?>" alt="">
        
        <div class="text-center">
            <!-- Title -->
            <h2 class="blog-title"><?php echo $blog_title ?></h2>

            <img class="blog-squiggle" src="assets/images/squiggle-red.png" alt="">   
            
            <!-- Date & Address -->
            <div>
                <h4 class="blog-date-address"><?php echo $blog_date?></h4>
                <h4 class="blog-date-address separator"> | </h4>
                <h4 class="blog-date-address"><?php echo $blog_address?></h4>
            </div>    
            
            <!-- Actual text of blog-->
            <?php echo $blog_text ?>
        </div>
        
        <!-- Next / Prev navigation -->
        <nav class="prev-next" role="navigation">
            <?php if($prev = $blog->prevVisible()): ?>
                <span class="pull-left">
                    <p class="previous-blog" 
                       uid="<?php echo $prev->uid(); ?>" 
                       onclick="openPrevNextWindow(this)">
                        &larr; PREVIOUS
                    </p>
                </span>
            <?php endif ?>
            <?php if($next = $blog->nextVisible()): ?>
                <span class="pull-right">
                    <p class="next-blog" 
                       uid="<?php echo $next->uid(); ?>" 
                       onclick="openPrevNextWindow(this)">
                        NEXT &rarr;
                    </p>
                </span>
            <?php endif ?>
        </nav>
    </div>

<?php endforeach ?>
