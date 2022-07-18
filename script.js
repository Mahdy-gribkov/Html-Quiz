const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");

const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

let shuffledQuestions, currectQuestionIndex;
let quizScore = 0;

startButton.addEventListener("click", startGame);

nextButton.addEventListener("click", () => {
  currectQuestionIndex++;
  setnextQuestion();
});

function startGame() {
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() =>Math.random() - 0.5);
  currectQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setnextQuestion();
  quizScore = 0;
}

function setnextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currectQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;

  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currectQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "restart";
    startButton.classList.remove("hide");
  }
  if ((selectedButton.dataset = correct)) {
    quizScore++;
  }
  document.getElementById("right-answer").innerText = quizScore;
}



function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

const questions = [
  {
    question: "What does mahdy want from you?",
    answers: [
      { text: "money", correct: false },
      { text: "tiyulim with gefen", correct: false },
      { text: "gaming", correct: false },
      { text: "falafel", correct: true },
    ],
  },
  {
    question: "how do you make falfel?",
    answers: [
      { text: "with love", correct: true },
      { text: "tiyulim with gefen", correct: false },
      { text: "you just make it", correct: false },
      { text: "trick question, you buy it", correct: false },
    ],
  },
  {
    question: "How much falafel can you make with 1Kg of hummos?",
    answers: [
      { text: "a lot", correct: false },
      { text: "tiyulim with gefen", correct: false },
      { text: "1 Kg", correct: false },
      { text: "1.25 Kg give or take", correct: true },
    ],
  },
  {
    question: "What does gefen want from you?",
    answers: [
      { text: "more falafel", correct: true },
      { text: "tiyulim with gefen", correct: true },
      { text: "love", correct: true },
      { text: "falafel", correct: true },
    ],
  },
];
