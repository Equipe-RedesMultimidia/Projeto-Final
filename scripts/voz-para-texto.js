var speechRecognition = new webkitSpeechRecognition();
var final_transcript = "";

speechRecognition.continuous = true;
speechRecognition.interimResults = true;

speechRecognition.onresult = (event) => {
    let interim_transcript = "";

    for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
            final_transcript += event.results[i][0].transcript;
        } else {
            interim_transcript += event.results[i][0].transcript;
        }
    }
    document.querySelector("#final").innerHTML = final_transcript;
    document.querySelector("#interim").innerHTML = interim_transcript;
};

var listenBtn = document.querySelector("#speech-bt");
var isListening = true;

listenBtn.onclick = () => {
    if(isListening){
        speechRecognition.start();
        listenBtn.innerText = "Pausar";
        isListening = false;
    }else{
        speechRecognition.stop();
        listenBtn.innerText = "Ouvir";
        isListening = true;
    }
};