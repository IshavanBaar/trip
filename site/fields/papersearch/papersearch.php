<?php

class PaperSearchField extends TextField {
	
	static public $assets = array(
    'js' => array(
      'get_papers.js'
    ));
	
	public function __construct() {

		$this->icon        = 'search';
		$this->label       = l::get('fields.page.label', 'Page');
		//$this->placeholder = l::get('fields.page.placeholder', 'path/to/page');

	}

	public function input() {

		$input = parent::input();
		$input->data(array(
		  'field' => 'autocomplete',
		  'url'   => panel()->urls()->api() . '/autocomplete/uris'
		));
		return $input;
		
	}
}




	