const input = document.querySelector('#text-input');
const word = [
    { "漢字": "愛", "ローマ字": "ai" },
    { "漢字": "友達", "ローマ字": "tomodachi" },
    { "漢字": "家族", "ローマ字": "kazoku" },
    { "漢字": "学校", "ローマ字": "gakkou" },
    { "漢字": "先生", "ローマ字": "sensei" },
    { "漢字": "本", "ローマ字": "hon" },
    { "漢字": "車", "ローマ字": "kuruma" },
    { "漢字": "猫", "ローマ字": "neko" },
    { "漢字": "犬", "ローマ字": "inu" },
    { "漢字": "空", "ローマ字": "sora" }
]
const kanjiList = word.map(item => item.漢字);
const romajiList = word.map(item => item.ローマ字);
let userInputKey = ""
let kanjis = ''
let romajis = ''
const pKanji = document.querySelector('#kanji-word')
const pRomaji = document.querySelector('#romaji-word')

const spans = document.querySelectorAll('span')

const randomWord = () => {
    const random = Math.floor(Math.random() * kanjiList.length);
    kanjis = kanjiList[random]
    romajis = romajiList[random]
}



const addSpanWord = () => {
    pKanji.innerText = kanjis
    for (let romaji of romajis) {
        const span = document.createElement('span')
        span.innerText = romaji
        pRomaji.append(span)
        console.log(span)
    }
}

const checkInput = () => {
    console.log()
    console.log(userInputKey)
}

const deleteSpans = () => {
    const spans = document.querySelectorAll('span')
    for (let deleteSpan of spans) { //スパンをリセット
        deleteSpan.remove()
        console.log(deleteSpan)
    }
    console.log(spans)
}

input.addEventListener('input', function hello(evt) {
    const spans = document.querySelectorAll('span')
    userInputKey = evt.target.value//ユーザーの入力を監視
    let correct = true;
    spans.forEach((span, index) => {
        if (userInputKey[index] !== span.innerText) {
            correct = false;
            span.style.color = 'red'; // 不正解の場合、文字色を赤に変更
        } else {
            span.style.color = 'black'; // 正解の場合、文字色を黒に変更
        }
    });

    if (correct) {
        console.log('ok');
        main()
    } else {
        console.log('incorrect');
    }
});

const userInput = () => {
    return userInputKey
}




const main = () => {
    deleteSpans()//スパンをリセット
    randomWord() //ランダムな単語を抽出と
    addSpanWord()//ローマ字の一文字ずつスパンに入れる
    checkInput()
    input.value = ''
}



main()