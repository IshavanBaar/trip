$(document).ready(function() {
	var userInput = $('#form-field-title').val();
	console.log(userInput);
	if (userInput != "") {
		$.ajax({
			type: "GET",
			url: "../../../../assets/js/get_papers.php",
			data:{ query: userInput}, 
			success: function(data){
				console.log(data); 
			}
		})
	}
});