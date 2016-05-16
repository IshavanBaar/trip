<?php

/*

---------------------------------------
License Setup
---------------------------------------

Please add your license key, which you've received
via email after purchasing Kirby on http://getkirby.com/buy

It is not permitted to run a public website without a
valid license key. Please read the End User License Agreement
for more information: http://getkirby.com/license

*/

// License key.
c::set('license', 'K2-PERSONAL-057b18ed282611f69fc8b050beebc5b2');

/* 
---------------------------------------
Roles for system
---------------------------------------

Client will not be able to login to panel, but to site only

*/
c::set('roles', array(
  array(
    'id'      => 'admin',
    'name'    => 'Admin',
    'default' => true,
    'panel'   => true
  ),
  array(
    'id'      => 'editor',
    'name'    => 'Editor',
    'panel'   => true
  ),
  array(
    'id'      => 'client',
    'name'    => 'Client',
    'panel'   => false
  )
));

// When logout URL is opened, call logout action method. 
c::set('routes', array(
  array(
    'pattern' => 'logout',
    'action'  => function() {
      if($user = site()->user()) $user->logout();
      // Goes to home page now, but can be set to login.
	  go('/');
    }
  )
));

/*

---------------------------------------
Kirby Configuration
---------------------------------------

By default you don't have to configure anything to
make Kirby work. For more fine-grained configuration
of the system, please check out http://getkirby.com/docs/advanced/options

*/