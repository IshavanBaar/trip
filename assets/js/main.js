/* Replaces the JPG image for a GIF. */
function play(image){
	var GIF = image.src.replace('.jpg', '.gif');
	image.src = GIF;
		
	// I tried a border, but it is not working.
	//image.classList.remove('stopping');
	//image.classList.add('playing');
}

/* Replaces the GIF image for a JPG. */
function stop(image){
	var JPG = image.src.replace('.gif', '.jpg');
	image.src = JPG;
}

/*
function showHint(userInput) { 
	console.log(userInput);
	$.ajax({
		type: "POST",
		url: "assets/js/get_papers.php",
		data:{ query: userInput}, 
		success: function(data){
			console.log(data); 
		}
	})

}

function bla() {}
d3.json("get_papers.php" + textBoxValue, function(error, data) {	}
jQuery.post(get_papers.php[][][])*/