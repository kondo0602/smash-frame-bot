import { ClientConfig, Client, WebhookEvent } from '@line/bot-sdk';
import { GetCommandDataUsecase } from '../usecase/get-command-data-usecase';
import { CommandDataRepository } from '../infrastructure/command-data-repository';

require('dotenv').config();

// Setup all LINE client and Express configurations.
const clientConfig: ClientConfig = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || '',
  channelSecret: process.env.CHANNEL_SECRET,
};

// Create a new LINE SDK client.
const client = new Client(clientConfig);

export class CommandController {
  public async search(event: WebhookEvent) {
    console.log(event);
    if (event.type !== 'message' || event.message.type !== 'text') {
      return;
    }

    const repo = new CommandDataRepository();
    const getCommandDataUsecase = new GetCommandDataUsecase(client, repo);
    const { replyToken } = event;

    await getCommandDataUsecase.do(replyToken, event.message.text);
  }
}
