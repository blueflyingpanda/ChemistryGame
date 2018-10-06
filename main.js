const initialValues = [
	{label: "Бром", value: "br"},
	{label: "Кислород", value: "o"},
	{label: "Водород", value: "h"},
	{label: "Серебро", value: "ag"},
	{label: "Медь", value: "cu"},
	{label: "Железо", value: "fe"},
	{label: "Золото", value: "au"},
	{label: "Гелий", value: "he"},
	{label: "Платина", value: "pt"},
	{label: "Азот", value: "n"},
	{label: "Углерод", value: "c"},
	{label: "Фосфор", value: "p"},
	{label: "Фтор", value: "f"},
	{label: "Кальций", value: "ca"},
	{label: "Калий", value: "k"},
	{label: "Магний", value: "mg"},
	{label: "Цинк", value: "zn"},
	{label: "Алюминий", value: "al"},
	{label: "Барий", value: "ba"},
	{label: "Хлор", value: "cl"},
	{label: "Натрий", value: "na"},
];

const startBtn   = document.querySelector('#startBtn');
const restartBtn = document.querySelector('#restartBtn');

const phase1 = document.querySelector('#phase1');
const phase2 = document.querySelector('#phase2');
const phase3 = document.querySelector('#phase3');

const answer   = document.querySelector('#answer');
const question = document.querySelector('#question');
const timer    = document.querySelector('#timer');
const result   = document.querySelector('#result');

let currentElement;
let answers;
let elements;
let INTERVAL;
let TIMEOUT;

const ENTER_CODE    = 13;
const START_TIME    = 3000;
const TIME_INTERVAL = 100;

startBtn.onclick = function() {
	phase1.classList.add('hidden');
	phase2.classList.remove('hidden');
	initGame();
};

restartBtn.onclick = function() {
	phase3.classList.add('hidden');
	phase1.classList.remove('hidden');
	result.textContent = '';
};

answer.addEventListener('keydown', submit);

function initGame() {
	timer.textContent = 30;
	answers = {	right: 0, wrong: 0};
	console.log(answers);
	elements = [...initialValues];
	updateQuestion();
	INTERVAL = setInterval(updateTimer, TIME_INTERVAL);
	TIMEOUT = setTimeout(stopGame, START_TIME);
}

function updateTimer() {
	timer.textContent = (+timer.textContent - TIME_INTERVAL / 1000).toFixed(1);
}

function submit(event) {
	if (event.keyCode !== ENTER_CODE) {
		return;
	}
	const {value} = answer;
	answer.value = '';

	if (value.toLowerCase() === currentElement.value) {
		answers.right++;
	} else {
		answers.wrong++;
	}

	if (!elements.length) {
		stopGame();
	} else {
		updateQuestion();
	}
}

function updateQuestion() {
	currentElement = pickElement(elements);
	question.textContent = currentElement.label;
}

function pickElement(arr) {
	const index = Math.random() * arr.length | 0;
	return arr.splice(index, 1)[0];
}

function stopGame() {
	phase2.classList.add('hidden');
	phase3.classList.remove('hidden');

	clearInterval(INTERVAL);
	clearTimeout(TIMEOUT);

	rank();

	console.log(`You've got ${answers.right} right answers and ${answers.wrong} wrong.`);
}

function rank() {
	let resultText = `У тебя ${answers.right} правильных ответов.` + '<br />' +
									 `У тебя ${answers.wrong} неправильных ответов.` + '<br />';
	if (answers.right > answers.wrong) {
			resultText += `Менделеев бы тобой гордился!`;
	} else {
			resultText += `Ты так же далёк от химии, как Водород от Резерфордия в Таблице Менделеева`;
	}
	result.innerHTML = resultText;
}
