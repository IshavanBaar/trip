<?php

class CurrentUserField extends SelectField {

  public function __construct() {
    $this->type    = 'text';
    $this->icon    = 'user';
    $this->default = kirby()->site()->users()->current();
    $this->label   = l::get('fields.user.label', 'User');
    $this->options = array();

    foreach(kirby()->site()->users() as $user) {
      $this->options[$user->username()] = $user->username();
    }

  }

  public function value() {
    $value = parent::value();
    return empty($value) ? site()->user()->username() : parent::value();
  }

}
