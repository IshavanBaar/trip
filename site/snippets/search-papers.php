<div class="container-fluid">

	<div id="search-bar" class="col-lg-6 col-lg-offset-3 search-results">
		<form class="search" method="post">
			<!-- SEARCH BAR -->
			<div class="input-group">
				<input onkeyup="showHint(this.value)" type="search" class="form-control" placeholder="Search for papers, authors, keywords, ..." name="publication-query">
				<span class="input-group-btn">
					<button class="btn btn-default btn-primary" type="submit">
						<span class="glyphicon glyphicon-search" aria-hidden="true"></span>
					</button>
				</span>
			</div>
			
			<!-- SEARCH RESULTS -->
			<div class="col-lg-6 col-lg-offset-3">
			<?php 
			if(isset($_POST["publication-query"])) {
				// Get user input.
				$input_query = $_POST["publication-query"];
				$query = str_replace(" ", "+", $input_query);
				
				// Get publications from CrossRef API.
				$jsonString = file_get_contents("http://api.crossref.org/works?query=" . $query . 
					"&sort=relevance&rows=5&filter=publisher-name:Association+for+Computing+Machinery+(ACM)");
				$jsonData = json_decode($jsonString,true);
				$publications = $jsonData["message"]["items"];	
			
				$numberOfPublications = count($publications);
				$response = "";
				if($numberOfPublications !== 0) {
					
					// Write number of results.
					//echo "<p>" . count($publications) . " results for: " . $input_query . "</p>";
					$response= "<ul style='list-style-type:none'>";
					
					// For each publication, show the required data.
					foreach($publications as $publication) {
						
						// Show (sub)title.
						$title = $publication["title"][0];
						if(isset($publication["subtitle"][0])) {
							$title = $title . ": " . $publication["subtitle"][0];
						}
						$response = $response . "<li>" . "<strong>" . $title . "</strong>";
						
						// Show year.
						$year = $publication["published-print"]["date-parts"][0][0];
						$response = $response . "<br>" . $year;
						
						// Show author(s).
						$authors = $publication["author"];
						foreach($authors as $author) {
							$response = $response . "<br>";
							$name = $author["given"] . " " . $author["family"];
							$response = $response . $name;
						}
						
						// For now, horizontal line.
						$response = $response . "<hr>" . "</li>";
					}
					$response = $response . "</ul>";
				}
			} else {
				$response = "no results";
			}

			echo $response; 
			?>
			</div>
		</form>   
	</div>
</div>


