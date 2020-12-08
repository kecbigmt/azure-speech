const sdk = require('microsoft-cognitiveservices-speech-sdk');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const dist = process.argv[2];
const input = process.argv[3];
const voice = process.argv[4];
const subscriptionKey = process.env.AZURE_SUBSCRIPTION_KEY;
const serviceRegion = process.env.AZURE_SERVICE_REGION;

const speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
const voiceName = voice === 'nanami' ? 'ja-JP-NanamiNeural' :
  voice === 'keita' ? 'ja-JP-KeitaNeural' :
    voice === 'ayumi' ? 'ja-JP-Ayumi' :
      voice === 'haruka' ? 'ja-JP-HarukaRUS' :
        voice === 'ichiro' ? 'ja-JP-Ichiro' :
          'ja-JP-NanamiNeural';
          
(async () => {
  console.log('Now synthesizing...');
  try {
    const data = fs.readFileSync(input, "utf8");
    Promise.all(data.split('\n').map(line => {
      const cells = line.split(',');
      const text = cells[0];
      const speed = cells.length >= 2 ? cells[1] : '1.0';
      const filepath = path.join(dist, `${text}.wav`);
      const ssml = `
      <speak version="1.0" xmlns="https://www.w3.org/2001/10/synthesis" xml:lang="ja-JP">
        <voice name="${voiceName}">
          <prosody rate="${speed}">
            ${text}
          </prosody>
        </voice>
      </speak>
      `;
      const audioConfig = sdk.AudioConfig.fromAudioFileOutput(filepath);
      const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);
      return new Promise((resolve, _) => synthesizer.speakSsmlAsync(
        ssml,
        result => {
          if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
            console.log(`Saved: ${filepath}`);
          } else {
            console.error("Speech synthesis canceled, " + result.errorDetails);
          }
          synthesizer.close(() => resolve());
        },
        error => {
          console.log(error);
          synthesizer.close(() => resolve());
        }));
    })).then(() => console.log(`Speech synthesis finished.`));
  }
  catch (e) {
    console.log(e.message);
  }
})();
