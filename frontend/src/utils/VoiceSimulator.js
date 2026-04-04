const LANGUAGE_CONFIG = {
  english: { lang: 'en-IN', rate: 1.15, pitch: 0.9 },
  hindi:   { lang: 'hi-IN', rate: 1.05, pitch: 0.95 },
  marathi: { lang: 'mr-IN', rate: 1.05, pitch: 0.95 },
};

const simulateScammerVoice = (dialogue, language = 'english', onEnd = null) => {
  window.speechSynthesis.cancel();

  const config = LANGUAGE_CONFIG[language] || LANGUAGE_CONFIG.english;
  const utterance = new SpeechSynthesisUtterance(dialogue);

  utterance.lang   = config.lang;
  utterance.rate   = config.rate;
  utterance.pitch  = config.pitch;
  utterance.volume = 1;

  if (onEnd) utterance.onend = onEnd;
  window.speechSynthesis.speak(utterance);
};

const stopVoice = () => window.speechSynthesis.cancel();

export { simulateScammerVoice, stopVoice, LANGUAGE_CONFIG };