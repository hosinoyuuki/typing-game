import { word } from './module.js';

const inputElement = document.querySelector('#text-input');
const kanjiWords = word.map(item => item.漢字);
const romajiWords = word.map(item => item.ローマ字);
let currentUserInput = "";
let currentKanji = "";
let currentRomaji = "";
const kanjiParagraph = document.querySelector('#kanji-word');
const romajiParagraph = document.querySelector('#romaji-word');
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let audioFile = 'typingsound.mp3';
let audioState = 'key';

const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * kanjiWords.length);
    currentKanji = kanjiWords[randomIndex];
    currentRomaji = romajiWords[randomIndex];
};

const displayWordWithSpans = () => {
    kanjiParagraph.innerText = currentKanji;
    for (let romaji of currentRomaji) {
        const spanElement = document.createElement('span');
        spanElement.innerText = romaji;
        romajiParagraph.append(spanElement);
    }
};

const removeSpans = () => {
    const spanElements = document.querySelectorAll('span');
    for (let span of spanElements) {
        span.remove();
    }
};

inputElement.addEventListener('input', function handleUserInput(evt) {
    audioState = 'key';
    playAudio();
    const spanElements = document.querySelectorAll('span');
    currentUserInput = evt.target.value;
    let isCorrect = true;

    spanElements.forEach((span, index) => {
        if (currentUserInput[index] !== span.innerText) {
            isCorrect = false;
            span.style.color = 'red';
            inputElement.value = currentUserInput.slice(0, index);
            currentUserInput = inputElement.value;
        } else {
            span.style.color = 'black';
        }
    });

    if (isCorrect) {
        main();
        audioState = 'correct';
        playAudio();
    }
});

async function playAudio() {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    audioFile = audioState === 'key' ? 'typingsound.mp3' : 'correctanswer.mp3';

    const response = await fetch(audioFile);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);
    const audioSource = audioCtx.createBufferSource();
    audioSource.buffer = audioBuffer;
    audioSource.connect(audioCtx.destination);
    audioSource.start();
}

const main = () => {
    removeSpans();
    getRandomWord();
    displayWordWithSpans();
    inputElement.value = '';
};

main();
