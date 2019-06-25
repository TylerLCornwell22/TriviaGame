$(document).ready(function () {
    

    var correctAnswers = 0;
    var wrongAnswers = 0;
    var notAnsweredQuestions = 0;
    var timeRemaining = 15;
    var interVal;
    var questionIndex = 0; 
    var answered = false; 
    var correct;
    var triviaGame = [{
    //    question 1
        question: "What is the most points Kobe Bryant has scored in a single game ?",
        answer: ["72", "81", "89"],
        correct: "1",
        
        // question 2
    }, {
        question: "How tall is Shaq?",
        answer: ["6'5", "7'6", "7'1" ],
        correct: "2",
        
        // question 3
    }, {
        question: "How many Championships do the Lakers have?",
        answer: ["16", "12", "14"],
        correct: "0",
        
        // question 4
    }, {
        question: "What NBA player is known as - The Logo?",
        answer: ["Kobe Bryant", "Bill Russell", "Jerry West"],
        correct: "2",
        
        // question 5
    }, {
        question: "Who is the NBA's all time leading points scorer? ",
        answer: ["Michael Jordan", "Kareem Abdul-Jabbar", "Lebron James"],
        correct: "1",
        
    }];

    // Declaring my functions


    function startGame() {
        $('.start-button').remove();
        correctAnswers = 0;
        wrongAnswers = 0;
        notAnsweredQuestions = 0;
        loadQandA();
    }

    function loadQandA() {
        answered = false; 
        timeRemaining = 15;
        interVal = setInterval(timer, 500);
        if (answered === false) {
            timer();
        }
        correct = triviaGame[questionIndex].correct;
        var question = triviaGame[questionIndex].question;
        $('.question').html(question);
        for (var i = 0; i < 3; i++) {
            var answer = triviaGame[questionIndex].answer[i];
            $('.answers').append('<h4 class= answersAll id=' + i + '>' + answer + '</h4>');
        }

        $("h4").click(function () {
            var id = $(this).attr('id');
            if (id === correct) {
                answered = true; 
                $('.question').text("The correct answer is: " + triviaGame[questionIndex].answer[correct]);
                correctAnswer();
            } else {
                answered = true; 
                $('.question').text(" You have chosen: " + triviaGame[questionIndex].answer[id] + " But the answer is " + triviaGame[questionIndex].answer[correct]);
                incorrectAnswer();
            }
        });
    }

    function timer() {
        if (timeRemaining === 0) {
            answered = true;
            clearInterval(interVal);
            $('.question').text(" The right answer is: " + triviaGame[questionIndex].answer[correct]);
            unAnswered();
        } else if (answered === true) {
            clearInterval(interVal);
        } else {
            timeRemaining--;
            $('.timeRemaining').text('You have ' + timeRemaining + ' seconds to make your choice');
        }
    }

    function correctAnswer() {
        correctAnswers++;
        $('.timeRemaining').text("Correct!").css({
            
        });
        resetRound();
    }

    function incorrectAnswer() {
        wrongAnswers++;
        $('.timeRemaining').text("wrong answer!").css({
            
        });
        resetRound();

    }

    function unAnswered() {
        notAnsweredQuestions++;
        $('.timeRemaining').text("You didnt choose an answer").css({
            
        });
        resetRound();
    }

    function resetRound() {
        $('.answersAll').remove();
       
        questionIndex++; 
        if (questionIndex < triviaGame.length) {
            setTimeout(function () {
                loadQandA();
            }, 5000); 
        } else {
            setTimeout(function () {
                $('.question').remove();
                $('.timeRemaining').remove();
                $('.answers').append('<h4 class= answersAll end>Right answers: ' + correctAnswers + '</h4>');
                $('.answers').append('<h4 class= answersAll end>Wrong answers: ' + wrongAnswers + '</h4>');
                $('.answers').append('<h4 class= answersAll end>Not answered questions: ' + notAnsweredQuestions + '</h4>');
                setTimeout(function () {
                    location.reload();
                }, 7000);
            }, 5000);
        }
    };

    $('.startButton').on("click", function () {
        $('.startButton');
        startGame();

    });

});