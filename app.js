//JavaScript Quiz
$(document).ready(function(){

	//Question constructor
	function Question(question, choices, answer) {
		this.question = question;
		this.choices = choices;
		this.answer = answer;
		this.isCorrectAnswer = function(guess) {
			return guess === this.answer;
		}
	} 


	//Questions
	var q1 = new Question("Who is Arsenal's all time leading goal scorer?", ["Ian Wright", "Dennis Bergkamp", "Thierry Henry"], "Thierry Henry");

	var q2 = new Question("Who were the last World Cup winners?", ["Germany", "Italy", "Brazil"], "Germany");

	var q3 = new Question("Who were the last team to win back-to-back Premier League titles?", ["Manchester United", "Manchester City", "Arsenal"], "Manchester United");

	var allQuestions = [q1, q2, q3];
	var userScore = 0;
	var currentQuestionIndex = 0;
	var $choicesList = $("#choices");


	function hasEnded() {
		return currentQuestionIndex >= allQuestions.length;
	}	


	function renderElements(question) {
		var listHTML = "";
		listHTML += "<h3>" + question.question + "</h3>";

		for(var i = 0; i < question.choices.length; i++) {
			listHTML += "<li><input type='radio' name='quiz'> ";
			listHTML += "<span>" + question.choices[i] + "</span>";
			listHTML += "</li>";
		}

		$choicesList.append(listHTML);
	}


	function renderGameOver () {
		var html = "<h2>Game Over</h2>";
		html += "<p>Your score is " + userScore + " </p>";

		$("#quiz-form").remove();
		$("#quiz-container").append(html);
	}


	function displayNext () {
		if (hasEnded()) {
			renderGameOver();
		} 
		else {
			renderElements(allQuestions[currentQuestionIndex]);	
		}
	}


	function checkAnswer (choice) {
	if (allQuestions[currentQuestionIndex].isCorrectAnswer(choice)) {
			userScore ++;
		}
	}


	$("#quiz-form").submit(function(evt) {
		evt.preventDefault();

		if ($("input[type='radio']").is(":checked")) {
		
			var $btnChoice = $("input[type='radio']:checked");
			var choice = $btnChoice.next().text();
			console.log(choice);

			checkAnswer(choice);
			currentQuestionIndex ++;
			$choicesList.children().remove();
			displayNext();
		} 
		else {
			alert("Please choose your answer.");
		}
	});


	displayNext();
});