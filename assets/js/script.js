document.addEventListener('DOMContentLoaded', () => {
  const textEl = document.getElementById('text');
  const speedEl = document.getElementById('speed');
  const speedValueEl = document.getElementById('speedValue');
  const playPauseBtn = document.getElementById('playPause');
  const downloadBtn = document.getElementById('download');
  const progressEl = document.getElementById('progress');
  const generateButton = document.getElementById('generateButton');
  const audioPlayer = document.getElementById('audioPlayer');
  const charCountEl = document.getElementById('charCount');
  const clearBtn = document.getElementById('clearText');
  const playButton = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-play-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"></path>
  <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445"></path>
</svg>`
  const pauseButton = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-pause-circle" viewBox="0 0 16 16">
  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"></path>
  <path d="M5 6.25a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0zm3.5 0a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0z"></path>
</svg>`

  const languageSelect = document.getElementById('languageSelect');
  const voiceSelect = document.getElementById('voiceSelect');

  let sound = null;
  let audioUrl = null;
  let updateInterval = null;

  function updateCharCount() {
    if (textEl.value.length > 200) {
      textEl.value = textEl.value.slice(0, 200);
    }
    charCountEl.textContent = textEl.value.length;
  }

  textEl.addEventListener('input', updateCharCount);

  clearBtn.addEventListener('click', () => {
    textEl.value = '';
    updateCharCount();
  });

  const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "de", name: "Deutsch" },
    { code: "it", name: "Italiano" },
    { code: "pt", name: "Português" },
    { code: "pl", name: "Polski" },
    { code: "tr", name: "Türkçe" },
    { code: "ru", name: "Русский" },
    { code: "nl", name: "Nederlands" },
    { code: "cs", name: "Čeština" },
    { code: "ar", name: "العربية" },
    { code: "zh-cn", name: "简体中文" },
    { code: "hu", name: "Magyar" },
    { code: "ko", name: "한국어" },
    { code: "ja", name: "日本語" },
    { code: "hi", name: "हिन्दी" }
  ];

  const voices = [
    { code: "Claribel Dervla", name: "Claribel Dervla" },
    { code: "Daisy Studious", name: "Daisy Studious" },
    { code: "Gracie Wise", name: "Gracie Wise" },
    { code: "Tammie Ema", name: "Tammie Ema" },
    { code: "Alison Dietlinde", name: "Alison Dietlinde" },
    { code: "Ana Florence", name: "Ana Florence" },
    { code: "Annmarie Nele", name: "Annmarie Nele" },
    { code: "Asya Anara", name: "Asya Anara" },
    { code: "Brenda Stern", name: "Brenda Stern" },
    { code: "Gitta Nikolina", name: "Gitta Nikolina" },
    { code: "Henriette Usha", name: "Henriette Usha" },
    { code: "Sofia Hellen", name: "Sofia Hellen" },
    { code: "Tammy Grit", name: "Tammy Grit" },
    { code: "Tanja Adelina", name: "Tanja Adelina" },
    { code: "Vjolla Johnnie", name: "Vjolla Johnnie" },
    { code: "Andrew Chipper", name: "Andrew Chipper" },
    { code: "Badr Odniambo", name: "Badr Odniambo" },
    { code: "Dionisio Schuyler", name: "Dionisio Schuyler" },
    { code: "Royston Min", name: "Royston Min" },
    { code: "Viktor Eka", name: "Viktor Eka" },
    { code: "Abrahan Mack", name: "Abrahan Mack" },
    { code: "Adde Michal", name: "Adde Michal" },
    { code: "Baldur Sanjin", name: "Baldur Sanjin" },
    { code: "Craig Gutsy", name: "Craig Gutsy" },
    { code: "Damien Black", name: "Damien Black" },
    { code: "Gilberto Mathias", name: "Gilberto Mathias" },
    { code: "Ilkin Urbano", name: "Ilkin Urbano" },
    { code: "Kazuhiko Atallah", name: "Kazuhiko Atallah" },
    { code: "Ludvig Milivoj", name: "Ludvig Milivoj" },
    { code: "Suad Qasim", name: "Suad Qasim" },
    { code: "Torcull Diarmuid", name: "Torcull Diarmuid" },
    { code: "Viktor Menelaos", name: "Viktor Menelaos" },
    { code: "Zacharie Aimilios", name: "Zacharie Aimilios" },
    { code: "Nova Hogarth", name: "Nova Hogarth" },
    { code: "Maja Ruoho", name: "Maja Ruoho" },
    { code: "Uta Obando", name: "Uta Obando" },
    { code: "Lidiya Szekeres", name: "Lidiya Szekeres" },
    { code: "Chandra MacFarland", name: "Chandra MacFarland" },
    { code: "Szofja Granger", name: "Szofja Granger" },
    { code: "Camilla Holmström", name: "Camilla Holmström" },
    { code: "Lilya Stainthorpe", name: "Lilya Stainthorpe" },
    { code: "Zofija Kendrick", name: "Zofija Kendrick" },
    { code: "Narelle Moon", name: "Narelle Moon" },
    { code: "Barbora MacLean", name: "Barbora MacLean" },
    { code: "Alexandra Hisakawa", name: "Alexandra Hisakawa" },
    { code: "Alma Maria", name: "Alma Maria" },
    { code: "Rosemary Okafor", name: "Rosemary Okafor" },
    { code: "Igor Granger", name: "Igor Granger" },
    { code: "Filip Traverse", name: "Filip Traverse" },
    { code: "Damjan Chapman", name: "Damjan Chapman" },
    { code: "Wulf Carlevaro", name: "Wulf Carlevaro" },
    { code: "Aaron Dreschner", name: "Aaron Dreschner" },
    { code: "Kumar Dahl", name: "Kumar Dahl" },
    { code: "Eugenio Mataraci", name: "Eugenio Mataraci" },
    { code: "Ferran Simen", name: "Ferran Simen" },
    { code: "Xavier Hayasaka", name: "Xavier Hayasaka" },
    { code: "Luis Mora Behringer", name: "Luis Mora Behringer" }

  ];

  // Заполняем select для языка
  languages.forEach(lang => {
    const option = document.createElement('option');
    option.value = lang.code;
    option.textContent = lang.name;
    languageSelect.appendChild(option);
  });

  // Заполняем select для голоса
  voices.forEach(voice => {
    const option = document.createElement('option');
    option.value = voice.code;
    option.textContent = voice.name;
    voiceSelect.appendChild(option);
  });

  speedEl.addEventListener('input', () => {
    speedValueEl.textContent = speedEl.value;
  });

  async function synthesize() {
    const text = textEl.value.trim();
    if (!text) return alert("Please enter text!");

    const language = languageSelect.value;
    const speaker = voiceSelect.value;
    const speed = parseFloat(speedEl.value);

    if (!language || !speaker) return alert("Please select voice and language!");

    const spinner = generateButton.querySelector('.spinner-border');
    spinner.style.display = 'inline-block';
    audioPlayer.style.opacity = 0;

    try {
      const response = await fetch("https://89.111.172.168:8000/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, language, speaker, speed })
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Speech synthesis error: ${response.status} ${errText}`);
      }

      const blob = await response.blob();
      const newAudioUrl = URL.createObjectURL(blob);

      // Останавливаем и выгружаем предыдущий звук
      if (sound) {
        sound.stop();
        sound.unload();
        sound = null;
      }

      audioUrl = newAudioUrl;

      sound = new Howl({
        src: [audioUrl],
        html5: true,
        onplay: () => {
          updateInterval = setInterval(() => {
            if (sound && sound.playing()) {
              const seek = sound.seek() || 0;
              const duration = sound.duration();
              progressEl.value = (seek / duration) * 100;
            }
          }, 100);
          playPauseBtn.innerHTML = pauseButton;
        },
        onend: () => {
          clearInterval(updateInterval);
          progressEl.value = 0;
          playPauseBtn.innerHTML = playButton;
        }
      });

      audioPlayer.style.display = 'flex';
      setTimeout(() => { audioPlayer.style.opacity = 1; }, 50);

    } catch (err) {
      console.error(err);
      alert("An error occurred while synthesizing speech.");
    } finally {
      spinner.style.display = 'none';
    }
  }

  playPauseBtn.addEventListener('click', async () => {
    if (!sound) {
      await synthesize();
      sound.play();
    } else {
      if (sound.playing()) {
        sound.pause();
        playPauseBtn.innerHTML = playButton;
      } else {
        sound.play();
        playPauseBtn.innerHTML = pauseButton;
      }
    }
  });

  progressEl.addEventListener('input', () => {
    if (sound) {
      const duration = sound.duration();
      const seekTime = (progressEl.value / 100) * duration;
      sound.seek(seekTime);
    }
  });

  downloadBtn.addEventListener('click', async () => {
    if (!audioUrl) await synthesize();
    const a = document.createElement('a');
    a.href = audioUrl;
    a.download = "speech.wav";
    a.click();
  });

  generateButton.addEventListener('click', async () => {
    await synthesize();
  });
});
