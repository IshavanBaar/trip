<?php 

return function($site, $pages, $page) {

  // Don't show the login screen to already logged in users
  if($site->user()) go('/');

  // Handle the form submission.
  if(r::is('post') and get('login')) {

    // Fetch username and try to log in.
    if($user = $site->user(get('username')) and $user->login(get('password'))) {
      // If succesful, redirect to the homepage.
      go('/');
    } else {
      // If not, display error.
      $error = true;
    }

  } else {
    // Nothing submitted, nothing wrong.
    $error = false;  
  }

  return array('error' => $error);

};