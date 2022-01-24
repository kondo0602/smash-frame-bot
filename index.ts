// Import all dependencies, mostly using destructuring for better view.
import { ClientConfig, Client, middleware, MiddlewareConfig, WebhookEvent, TextMessage, MessageAPIResponseBase } from '@line/bot-sdk';
import express, { Application, Request, Response } from 'express';

// Setup all LINE client and Express configurations.
const clientConfig: ClientConfig = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || '',
  channelSecret: process.env.CHANNEL_SECRET,
};

const middlewareConfig: MiddlewareConfig = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET || '',
};

const PORT = process.env.PORT || 3000;

// Create a new LINE SDK client.
const client = new Client(clientConfig);

// Create a new Express application.
const app: Application = express();

const fs = require('fs');
const csv = require('csv');

// Isolate message characterName and command.
async function isolateNameAndCommand(message: string) {
  const characterNameList = ["マリオ", "まりお", "ルイージ"];
  let formattedCharacterName = "";
  let command = "";

  for (const characterName of characterNameList) {
    if (message.startsWith(characterName)) {
      formattedCharacterName = await formatCharacterName(characterName);
      command = message.slice(characterName.length);
    }
  }

  return [formattedCharacterName, command];
}

// Format character name.
async function formatCharacterName(nickName: string) {
  let characterName = "";

  switch (nickName) {
    case "マリオ":
    case "まりお":
      characterName = "01_マリオ";
      break;
    case "ルイージ":
    case "るいーじ":
      characterName = "02_ルイージ";
      break;
    default:
      console.log("該当なし");
  }

  return characterName;
}

// Function handler to receive the text.
const textEventHandler = async (event: WebhookEvent): Promise<MessageAPIResponseBase | undefined> => {
  // Process all variables here.
  if (event.type !== 'message' || event.message.type !== 'text') {
    return;
  }

  // Isolate message character name and command
  let characterName: string, command: string;
  [characterName, command] = await isolateNameAndCommand(event.message.text);

  console.log(`入力されたキャラクター名：${characterName}`);
  console.log(`入力されたコマンド：${command}`);

  // Process all message related variables here.
  const { replyToken } = event;
  const text: string = characterName;

  // Read frame sheet.
  fs.createReadStream(__dirname + "/../csv/" + characterName + ".csv").pipe(
    csv.parse({ columns: true }, function (err: unknown, json: JSON) {

      console.log(json);
    })
  );

  // Create a new message.
  const response: TextMessage = {
    type: 'text',
    text,
  };

  // Reply to the user.
  await client.replyMessage(replyToken, response);
};

// This route is used for the Webhook.
app.post(
  '/webhook',
  middleware(middlewareConfig),
  async (req: Request, res: Response): Promise<Response> => {
    const events: WebhookEvent[] = req.body.events;

    // Process all of the received events asynchronously.
    const results = await Promise.all(
      events.map(async (event: WebhookEvent) => {
        try {
          await textEventHandler(event);
        } catch (err: unknown) {
          if (err instanceof Error) {
            console.error(err);
          }

          // Return an error message.
          return res.status(500).json({
            status: 'error',
          });
        }
      })
    );

    // Return a successfull message.
    return res.status(200).json({
      status: 'success',
      results,
    });
  }
);

// Create a server and listen to it.
app.listen(PORT, () => {
  console.log(`Application is live and listening on port ${PORT}`);
});
