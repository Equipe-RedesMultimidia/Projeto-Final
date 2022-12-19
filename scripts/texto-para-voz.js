voiceList = document.querySelector("select");
var synth = speechSynthesis;

voices();

function voices(){
    for(let voice of synth.getVoices()){
        let selected = voice.name.match(/.*BR.*/) ? "selected" : "";
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
        voiceList.insertAdjacentHTML("beforeend", option);
    }
}

synth.addEventListener("voiceschanged", () => voices());

const textarea = document.querySelector("textarea");
speechBtn = document.querySelector(".botao-conversor");
isSpeaking = true;

function textToSpeech(text){
    let utterance = new SpeechSynthesisUtterance(text);
    for(let voice of synth.getVoices()){
        if(voice.name === voiceList.value){
            utterance.voice = voice;
        }
    }
    synth.speak(utterance);
}

speechBtn.addEventListener("click", (e) =>{
    e.preventDefault();
    if(textarea.value !== ""){
        if(!synth.speaking){
            textToSpeech(textarea.value);       
        }
        if(isSpeaking){
            synth.resume();
            isSpeaking = false;
            speechBtn.innerText = "Pausar";
        }else{
            synth.pause();
            isSpeaking = true;
            speechBtn.innerText = "Resumo";
        }
        setInterval(()=>{
            if(!synth.speaking && !isSpeaking){
                isSpeaking = true;
                speechBtn.innerText = "Converter para Voz";
            }
        }, 50);
    }
}
);