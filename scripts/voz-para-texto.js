var recog = new webkitSpeechRecognition();
var final_transcript = "";
var textarea = document.querySelector("#textarea");

recog.continuous = true;
recog.interimResults = true;

recog.onresult = (e) => {
    var transcript = e.results[0][0].transcript;
    textarea.innerHTML = transcript;
};

var listenBtn = document.querySelector("#speech-bt");
var isListening = true;

listenBtn.onclick = () => {
    if(isListening){
        recog.start();
        listenBtn.innerText = "Pausar";
        isListening = false;
    }
    else{
        recog.stop();
        listenBtn.innerText = "Ouvir";
        isListening = true;
    }
};