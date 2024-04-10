// Тексты
const paragraphs = [
    "Давеча Витька сказал, что идет в одну компанию, а в лаборатории оставляет работать дубля. Дубль — это очень интересная штука. Как правило, это довольно точная копия своего творца. Не хватает, скажем, человеку рук — он создает себе дубля безмозглого, безответного, только и умеющего, что паять контакты, или таскать тяжести, или писать под диктовку, но зато уж умеющего это делать хорошо.",
    "Диван был транслятором. Он создавал вокруг себя М-поле, преобразующее, говоря просто, реальную действительность в действительность сказочную. Я испытал это на себе в памятную ночь на хлебах у Наины Киевны, и спасло меня тогда только то, что диван работал в четверть силы, иначе я проснулся бы каким-нибудь мальчиком с пальчик в сапогах.",
    "Незнакомец уже стоял на набережной и наблюдал за тем, как несколько матросов, надрываясь, тащат по трапу громадный, скрепленный медными обручами сундук. Рядом с чужеземцем высился хмурый тип, очевидно капитан судна. Слепой Хью славился тем, что с расстояния в пятьдесят шагов мог мгновенно учуять самую мелкую золотую монетку, сейчас же тело попрошайки все затрепетало. Один вид только что прибывшего в Анк-Морпорк чужестранца сулил немедленное и баснословное обогащение.",
    "Двуединый город Анк-Морпорк, первый по значению из городов, лежащих у Круглого моря, был, само собой разумеется, пристанищем для огромного количества банд, воровских гильдий, синдикатов и других подобных организаций. Данное обстоятельство являлось одной из причин его процветания. Большая часть бедного люда, ютившегося в лабиринте переулков Морпорка, пополняла свои скромные доходы, оказывая те или иные мелкие услуги какой-нибудь из соперничающих группировок. ",
    "Теперь волшебник болтался по городу, зарабатывая на жизнь своей врожденной способностью к языкам. Работать он особо не любил, но отличался живым умом и своими пронырливыми повадками напоминал смышленого грызуна. Кроме того, он с первого взгляда мог распознать древесину груши разумной. Как раз сейчас он на нее и смотрел – смотрел и не мог поверить своим глазам.",
    "Архимаг, приложив величайшие усилия и затратив огромное количество времени, мог надеяться в конечном итоге заполучить небольшой посох, сделанный из груши разумной. Это редкое дерево растет только там, где в древности водилась магия, поэтому даже во всех городах Круглого моря не найдется двух посохов из груши разумной. Что же касается огромного сундука… Ринсвинд провел в уме быстрые подсчеты и пришел к выводу, что, даже если бы сундук был до отказа набит звездными опалами и кусками золотоносной руды, все равно его содержимое не стоило бы и десятой части содержащего.",
];

const typingText = document.querySelector(".typing-text p")
const inpField = document.querySelector(".wrapper .input-field")
const tryAgainBtn = document.querySelector(".content button")
const timeTag = document.querySelector(".time span b")
const mistakeTag = document.querySelector(".mistake span")
const wpmTag = document.querySelector(".wpm span")
const cpmTag = document.querySelector(".cpm span")
const keyboard = document.querySelector(".wrapper")

function scrollToTop() {
    window.scrollTo(0, 0);
}

window.onload = scrollToTop;

let hero = document.querySelector('.hero')
document.addEventListener("click", function () {
    hero.classList.add('hero_jump');

    const scrollHeight = 1000; // Высота прокрутки
    const scrollSpeed = 5000; // Скорость прокрутки

    const scrollStep = scrollHeight / (scrollSpeed / 15);
    let scrollCount = 0;
    const scrollScrollInterval = setInterval(function () {
        const scrollInterval = setInterval(function () {
        if (scrollCount < scrollHeight) {
            window.scrollBy(0, scrollStep);
            scrollCount += scrollStep;
        } else {
            clearInterval(scrollInterval);
        }
    }, 50);
    }, 150);
    
})

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = mistakes = isTyping = 0;

function loadParagraph() {
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[ranIndex].split("").forEach(char => {
        console.log(char);
        let span = `<span>${char}</span>`
        typingText.innerHTML += span;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if (charIndex < characters.length - 1 && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if (typedChar == null) {
            if (charIndex > 0) {
                charIndex--;
                if (characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if (characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

        wpmTag.innerText = wpm;
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = charIndex - mistakes;
    } else {
        clearInterval(timer);
        inpField.value = "";
    }
}

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
        wpmTag.innerText = wpm;
    } else {
        clearInterval(timer);
    }
}

function resetGame() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value = "";
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    mistakeTag.innerText = 0;
    cpmTag.innerText = 0;
}

loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);