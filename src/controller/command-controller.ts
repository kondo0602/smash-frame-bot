import { ClientConfig, Client, TextMessage, WebhookEvent } from '@line/bot-sdk';
import { GetCommandDataUsecase } from '../usecase/get-command-data-usecase';
import { CommandDataRepository } from '../infrastructure/command-data-repository';
import { isolateNameAndCommand } from './__shared__/isolate-name-and-command';
import { buildReplyMessage } from './__shared__/build_reply-message';

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
    if (event.type !== 'message' || event.message.type !== 'text') {
      return;
    }

    let name: string, command: string;
    [name, command] = isolateNameAndCommand(event.message.text);

    const repo = new CommandDataRepository();
    const getCommandDataUsecase = new GetCommandDataUsecase(repo);
    const { replyToken } = event;

    const character = await getCommandDataUsecase.do(name, command);

    const replyMessage: string = buildReplyMessage(
      character.commandDatas,
      command,
    );

    // Create a new message.
    const response: TextMessage = {
      type: 'text',
      text: replyMessage,
    };

    // Reply to the user.
    client.replyMessage(replyToken, response);
  }
}
