import { word } from './module.js';

const input = document.querySelector('#text-input');
const kanjiList = word.map(item => item.漢字);
const romajiList = word.map(item => item.ローマ字);
let userInputKey = "";
let kanjis = "";
let romajis = "";
const pKanji = document.querySelector('#kanji-word');
const pRomaji = document.querySelector('#romaji-word');
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let sound = 'typingsound.mp3'
let soundCheck = 'key'

const randomWord = () => {
    const random = Math.floor(Math.random() * kanjiList.length);
    kanjis = kanjiList[random];
    romajis = romajiList[random];
};

const addSpanWord = () => {
    pKanji.innerText = kanjis;
    for (let romaji of romajis) {
        const span = document.createElement('span');
        span.innerText = romaji;
        pRomaji.append(span);
    }
};

const deleteSpans = () => {
    const spans = document.querySelectorAll('span');
    for (let deleteSpan of spans) {
        deleteSpan.remove();
    }
};

input.addEventListener('input', function hello(evt) {
    soundCheck = 'key'
    playAudio();
    const spans = document.querySelectorAll('span');
    userInputKey = evt.target.value; // ユーザーの入力を監視
    let correct = true;
    spans.forEach((span, index) => {
        if (userInputKey[index] !== span.innerText) {
            correct = false;
            span.style.color = 'red'; // 不正解の場合、文字色を赤に変更
            input.value = userInputKey.slice(0, index); // 間違った文字を削除
            userInputKey = input.value;
        } else {
            span.style.color = 'black'; // 正解の場合、文字色を黒に変更
        }
    });

    if (correct) {
        main();
        soundCheck = 'correct'
        playAudio()
    }
});


async function playAudio() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    // 音声ファイルを取得
    if (soundCheck === 'key') {
        sound = 'typingsound.mp3'
    } else if (soundCheck === 'correct') {
        sound = 'correctanswer.mp3'
    }

    const response = await fetch(sound);
    const arrayBuffer = await response.arrayBuffer();

    // 音声データをデコード
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    // 音声ソースを作成
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;

    // 再生デスティネーション（スピーカー）に接続
    source.connect(audioContext.destination);

    // 再生
    source.start();
}

const main = () => {
    deleteSpans(); // スパンをリセット
    randomWord(); // ランダムな単語を抽出
    addSpanWord(); // ローマ字の一文字ずつスパンに入れる
    input.value = ''; // 入力フィールドを空白にする
};

main();