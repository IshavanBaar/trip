<?php 

return function($site, $pages, $page) {

  $query   = get('q');
  
  /*For now it searches in recently-added only*/
  $results = page('recently-added')->search($query, 'title|text|tags');
  //$results = $results->paginate(20);
	
  return array(
    'query'      => $query,
    'results'    => $results
  );

};