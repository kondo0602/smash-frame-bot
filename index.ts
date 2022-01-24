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

// Isolate message characterName and command.
async function isolateNameAndCommand(message: string) {
  const characterList = ["マリオ", "まりお", "ルイージ"];
  let characterName = "";
  let command = "";

  for (const element of characterList) {
    if (message.startsWith(element)) {
      characterName = element;
      command = message.slice(element.length);
    }
  }

  return [characterName, command];
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

  console.log(characterName);
  console.log(command);

  // Process all message related variables here.
  const { replyToken } = event;
  const text: string = characterName;

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
