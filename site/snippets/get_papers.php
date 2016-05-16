<?php 
if(isset($_POST["query"])) {
	// Get user input.
	$input_query = $_POST["query"];
	$query = str_replace(" ", "+", $input_query);
	
	// Get publications from CrossRef API.
	$jsonString = file_get_contents("http://api.crossref.org/works?query=" . $query . 
		"&sort=relevance&rows=5&filter=publisher-name:Association+for+Computing+Machinery+(ACM)");
	$jsonData = json_decode($jsonString,true);
	$publications = $jsonData["message"]["items"];		
	
	// Return the JSON to the script.
	echo $jsonString;
?>
