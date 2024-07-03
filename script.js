// Dark Mode Functionality
const toggleDarkmodebtn = document.getElementById("toggleDarkMode");

toggleDarkmodebtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  //check for currently active mode
  const isDarkMode = document.body.classList.contains("dark-mode");
  toggleDarkmodebtn.textContent = isDarkMode
    ? "Switch to Light Mode"
    : "Switch to Dark Mode";
});
toggleDarkmodebtn.textContent = "Switch to Dark Mode";

//voice to Text functionality
const startRecognitionBtn = document.getElementById("startRecognition");
const stopRecognitionBtn = document.getElementById("stopRecognition");
const speakTextBtn = document.getElementById("speakText");
const selectedLanguage = document.getElementById("languageSelect");
const recognizedText = document.getElementById("recognizedText");

let recognition;
if ("SpeechRecognition" in window) {
  recognition = new SpeechRecognition();
} else if ("webkitSpeechRecognition" in window) {
  recognition = new webkitSpeechRecognition();
} else {
  alert("Your browser does not support speech recognition.");
}

recognition.continuous = true;
recognition.interimResult = true;

startRecognitionBtn.addEventListener("click", () => {
  recognition.lang = selectedLanguage.value;
  recognition.start();
  console.log("Start recognition");
});

stopRecognitionBtn.addEventListener("click", () => {
  console.log("Stop Recognition ");
  recognizedText.textContent = "";
  recognition.stop();
});

recognition.onresult = (event) => {
  let transcript = "";
  for (let i = event.resultIndex; i < event.results.length; i++) {
    transcript += event.results[i][0].transcript;
  }
  recognizedText.textContent = transcript;
};

recognition.onerror = (event) => {
  console.error(`Recognition error ${event.error}`);
};

//Text To Voice Functionality
const speechSynthesis = window.speechSynthesis;
const textInput = document.getElementById("textInput");
speakTextBtn.addEventListener("click", () => {
  const msg = textInput.value;
  if (msg.trim() != "") {
    const speech = new SpeechSynthesisUtterance(msg);
    speech.lang = languageSelect.value;
    speechSynthesis.speak(speech);
  } else {
    alert("Please enter some text to speak.");
  }
});
