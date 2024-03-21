import { exec } from "child_process";
import cors from "cors";
import dotenv from "dotenv";
import voice from "elevenlabs-node";
import express from "express";
import { promises as fs } from "fs";
dotenv.config();

const elevenLabsApiKey = process.env.ELEVEN_LABS_API_KEY;
const voiceID = process.env.ELEVEN_LABS_ID;

const app = express();
app.use(express.json());
app.use(cors());
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/voices", async (req, res) => {
  res.send(await voice.getVoices(elevenLabsApiKey));
});

const execCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) reject(error);
      resolve(stdout);
    });
  });
};

const lipSyncMessage = async () => {
  const time = new Date().getTime();
  console.log(`Starting conversion for message`);
  await execCommand(
    `ffmpeg -y -i audios/message.mp3 audios/message.wav`
    // -y to overwrite the file
  );
  console.log(`Conversion done in ${new Date().getTime() - time}ms`);
  await execCommand(
    `/usr/local/bin/rb/rhubarb -f json -o audios/message.json audios/message.wav -r phonetic`
  );
  // -r phonetic is faster but less accurate
  console.log(`Lip sync done in ${new Date().getTime() - time}ms`);
};

const chatBot = async (message) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "insomnia/8.2.0",
    },
    body: JSON.stringify({ message: message }),
  };
  return await fetch(
    "http://localhost:5001/api/agent/text-input",
    options
  ).then((response) => response.json());
};

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;
  const message = {};
  const fileName = `audios/message.mp3`; // The name of your audio file
  const chatbotResponse = await chatBot(userMessage);
  const textInput =
    chatbotResponse.data[0].queryResult.responseMessages[0].text.text[0];
  await voice.textToSpeech(elevenLabsApiKey, voiceID, fileName, textInput);
  // generate lipsync
  await lipSyncMessage();
  message.audio = await audioFileToBase64(fileName);
  message.lipsync = await readJsonTranscript(`audios/message.json`);
  res.send({
    messages: [
      {
        text: message,
        audio: await audioFileToBase64(fileName),
        lipsync: await readJsonTranscript(`audios/message.json`),
        facialExpression: "smile",
        animation: "Talking1",
      },
    ],
  });
});

const readJsonTranscript = async (file) => {
  const data = await fs.readFile(file, "utf8");
  return JSON.parse(data);
};

const audioFileToBase64 = async (file) => {
  const data = await fs.readFile(file);
  return data.toString("base64");
};

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
