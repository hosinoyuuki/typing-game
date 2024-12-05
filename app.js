import * as module from './module.js';

const inputElement = document.querySelector('#text-input');
const genshinWords = module.genshinWord.map(item => item.漢字);
const genshinRomajiWords = module.genshinWord.map(item => item.ローマ字);
const lifeWords = module.lifeWord.map(item => item.漢字);
const lifeRomajiWords = module.lifeWord.map(item => item.ローマ字);
let kanji = lifeWords 
let romaji =  lifeRomajiWords
let currentUserInput = "";
let currentKanji = "";
let currentRomaji = "";
const kanjiParagraph = document.querySelector('#kanji-word');
const romajiParagraph = document.querySelector('#romaji-word');
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let audioFile = 'typingsound.mp3';
let audioState = 'key';
const correctOfNumber = document.querySelector('#correctnumber');
let correcCount = 0 
const hpVar = document.querySelector('#hp-var');
let hp = 100
const modeSelectVarElements = document.querySelector('.left-var');
const modeSelectElements = document.querySelectorAll('#mode');
const startButtonElements = document.querySelector('#start-button');
const modeElements = document.querySelector('#select-mode');

inputElement.disabled = true


modeSelectElements[0].style.border = 'solid 1px black';
modeSelectElements[0].style.borderRadius = '15px';

const endGame = () => {
    startButtonElements.innerText = 'Start Game'
    modeElements.innerText = 'モード選択'
    modeSelectVarElements.style.display = 'block'
    correcCount = 0
    correctOfNumber.innerText = correcCount
    console.log(correcCount)
    inputElement.disabled = true
    kanjiParagraph.innerText = 'Press Start.';
    removeSpans()
}


const startGame = () => {
    startButtonElements.innerText = 'End Game'
    modeElements.innerText = '現在のモード'
    kanjiParagraph.style.color = 'black'
    main()
    inputElement.disabled = false
    hp = 100
    decreaseHp()
}


startButtonElements.addEventListener('click' ,function () {
    if(startButtonElements.innerText === 'End Game'){
        endGame()
    }else if (startButtonElements.innerText === 'Start Game') {
       startGame()
    }
})

for (let mode of modeSelectElements) {
    mode.addEventListener('click', function (e) {
        e.preventDefault();


        for (let el of modeSelectElements) {
            el.style.border = 'none';
        }

        switch (mode.innerText) {
            case '原神':
                kanji = genshinWords;
                romaji = genshinRomajiWords;
                modeSelectElements[1].style.border = 'solid 1px black';
                modeSelectElements[1].style.borderRadius = '15px';
                break;

            case '日常用語':
                kanji = lifeWords;
                romaji = lifeRomajiWords;
                modeSelectElements[0].style.border = 'solid 1px black';
                modeSelectElements[0].style.borderRadius = '15px';
                break;

            default:
                modeSelectElements[2].style.border = 'solid 1px black';
                modeSelectElements[2].style.borderRadius = '15px';
                alert('まだ対応していません');
                break;
        }

        console.log(kanji, romaji);
        
    });
}

const decreaseHp = () => {
    hp = hp - 1
    hpVar.style.width = hp + "%"
    if (hp === 0){
        kanjiParagraph.innerText = 'You Lose.'
        kanjiParagraph.style.color = 'red'
        removeSpans()
        inputElement.disabled = true
    }
}


const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * kanji.length);
    currentKanji = kanji[randomIndex];
    currentRomaji = romaji[randomIndex];
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
            decreaseHp()
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
    correctOfNumber.innerText = correcCount
    correcCount++
    
};

// main();
