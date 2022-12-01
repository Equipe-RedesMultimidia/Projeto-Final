const textarea = document.querySelector("textarea");
voiceList = document.querySelector("select");
speechBtn = document.querySelector(".botao-conversor");

let synth = speechSynthesis;
isSpeaking = true;

voices();

function voices(){
    for(let voice of synth.getVoices()){
        /*if(voice.name == "Google português do Brasil" ){
            let selected = "selected"
        } else{
            let selected = "selected"
        }*/

        let selected = voice.name.match(/.*português do Brasil.*/) ? "selected" : "";
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
        voiceList.insertAdjacentHTML("beforeend", option);
    }
}

synth.addEventListener("voiceschanged", voices);

function textToSpeech(text){
    let utterance = new SpeechSynthesisUtterance(text);
    for(let voice of synth.getVoices()){
        if(voice.name === voiceList.value){
            utterance.voice = voice;
        }
    }
    synth.speak(utterance);
}

speechBtn.addEventListener("click", e =>{
    e.preventDefault();
    if(textarea.value !== ""){
        if(!synth.speaking){
            textToSpeech(textarea.value);
        }
        if(textarea.value.length > 80){
            setInterval(()=>{
                if(!synth.speaking && !isSpeaking){
                    isSpeaking = true;
                    speechBtn.innerText = "Converter para Voz";
                }else{
                }
            }, 500);
            if(isSpeaking){
                synth.resume();
                isSpeaking = false;
                speechBtn.innerText = "Pausar";
            }else{
                synth.pause();
                isSpeaking = true;
                speechBtn.innerText = "Resumo";
            }
        }else{
            speechBtn.innerText = "Converter para Voz";
        }
    }
});