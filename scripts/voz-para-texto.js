var speak = document.querySelector("#speak");
var textarea = document.querySelector("#textarea");

var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

speak.addEventListener('click', () => {
    recognition.start();
    textarea.innerHTML = 'ouvindo...';
})

recognition.onresult = function (e) {
    var transcript = e.results[0][0].transcript;
    textarea.innerHTML = transcript;
}