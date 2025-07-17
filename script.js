let questions = [
  {
    question: "Wer hat HTML erfunden",
    answer_1: "Robbie Williams",
    answer_2: "Lady Gaga",
    answer_3: "Tim Berners",
    answer_4: "Justin Bieber",
    right_answer: 3,
  },
  {
    question: "Was bedeutet das HTML Tag a-Tag?",
    answer_1: "Text Fett",
    answer_2: "Container",
    answer_3: "Ein Link",
    answer_4: "Kursiv",
    right_answer: 3,
  },
  {
    question: "Wie definiert man in Javascript eine Variable?",
    answer_1: "let 100 = rate;",
    answer_2: "100 = let rate;",
    answer_3: "rate = 100;",
    answer_4: "let rate = 100;",
    right_answer: 4,
  },
  {
    question: "Welches Attribut kann man NICHT für Textarea verwenden?",
    answer_1: "readonly",
    answer_2: "max",
    answer_3: "from",
    answer_4: "spellcheck",
    right_answer: 3,
  },
  {
    question: "Welches Tag braucht kein Closing Tag?",
    answer_1: "img-Tag",
    answer_2: "p-Tag",
    answer_3: "div-Tag",
    answer_4: "main-Tag",
    right_answer: 1,
  },
];

let currentQuestion = 0;
let correctAnswers = 0;
let percent = 0;
let AUDIO_SUCCESS = new Audio("assets/rightAnswer.mp3");
let AUDIO_FAIL = new Audio("assets/wrongAnswer.mp3");

function init() {
  document.getElementById("current_question").innerHTML = currentQuestion + 1;
  document.getElementById("questions_length").innerHTML = questions.length;
  document.getElementById("questions_lengthv2").innerHTML = questions.length;
  showQuestion();
}

function showQuestion() {
  if (gameIsNotOver()) {
    updateProgressBar();
    updateToNextQuestion();
  } else {
    updateProgressBar();
    showEndScreen();
  }
}

function gameIsNotOver() {
  return currentQuestion < questions.length;
}

function updateToNextQuestion() {
  let question = questions[currentQuestion];
  document.getElementById("questiontext").innerHTML = question["question"];
  document.getElementById("answer_1").innerHTML = question["answer_1"];
  document.getElementById("answer_2").innerHTML = question["answer_2"];
  document.getElementById("answer_3").innerHTML = question["answer_3"];
  document.getElementById("answer_4").innerHTML = question["answer_4"];
  document.getElementById("current_question").innerHTML = currentQuestion + 1;
}

function showEndScreen() {
  document.getElementById("background").style = "display:none";
  document.getElementById("playing").style = "display:none";
  document.getElementById("finish").style = "";
  document.getElementById("right_answers").innerHTML = correctAnswers;
}

function updateProgressBar() {
  let percent = currentQuestion / questions.length;
  percent = Math.round(percent * 100);
  document.getElementById("progress-bar").innerHTML = `${percent} %`;
  document.getElementById("progress-bar").style.width = `${percent}%`;
}

function answer(selection) {
  let question = questions[currentQuestion];
  let selectedQuestionNumber = selection.slice(-1);
  let idOfRightAnswer = `answer_${question["right_answer"]}`;
  if (rightAnswerSelected(selectedQuestionNumber, question)) {
    document.getElementById(selection).parentNode.classList.add("bg-success");
    AUDIO_SUCCESS.play();
    correctAnswers++;
  } else {
    document.getElementById(selection).parentNode.classList.add("bg-danger");
    document
      .getElementById(idOfRightAnswer)
      .parentNode.classList.add("bg-success");
    AUDIO_FAIL.play();
  }
  document.getElementById("next-button").disabled = false;
}

function rightAnswerSelected(selectedQuestionNumber, question) {
  return selectedQuestionNumber == question["right_answer"];
}

function nextQuestion() {
  currentQuestion++;
  showQuestion();
  resetAnswersButton();
  document.getElementById("next-button").disabled = true;
}

function resetAnswersButton() {
  document.getElementById("answer_1").parentNode.classList.remove("bg-success");
  document.getElementById("answer_2").parentNode.classList.remove("bg-success");
  document.getElementById("answer_3").parentNode.classList.remove("bg-success");
  document.getElementById("answer_4").parentNode.classList.remove("bg-success");
  document.getElementById("answer_1").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_2").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_3").parentNode.classList.remove("bg-danger");
  document.getElementById("answer_4").parentNode.classList.remove("bg-danger");
}

function restartGame() {
  document.getElementById("background").style = "";
  document.getElementById("playing").style = "";
  document.getElementById("finish").style = "display:none";
  currentQuestion = 0;
  correctAnswers = 0;
  percent = 0;
  showQuestion();
}
