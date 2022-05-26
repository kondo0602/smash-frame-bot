import { ClientConfig, Client, TextMessage, WebhookEvent } from '@line/bot-sdk';
import { GetCommandDataUsecase } from '../usecase/get-command-data-usecase';
import { CommandDataRepository } from '../infrastructure/command-data-repository';
import { isolateNameAndCommand } from './__shared__/isolate-name-and-command';
import { buildReplyMessage } from './__shared__/build_reply-message';
import { Character } from '../domain/entity/character';

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

    const replyToken: string = event.replyToken;

    try {
      let name: string, command: string;
      [name, command] = isolateNameAndCommand(event.message.text);

      const repo = new CommandDataRepository();
      const getCommandDataUsecase = new GetCommandDataUsecase(repo);

      const character: Character = await getCommandDataUsecase.do(name);

      const replyMessage: string = buildReplyMessage(
        character.commandDatas,
        command,
      );

      const response: TextMessage = {
        type: 'text',
        text: replyMessage,
      };

      client.replyMessage(replyToken, response);
    } catch (error: any) {
      const response: TextMessage = {
        type: 'text',
        text: error.message,
      };

      client.replyMessage(replyToken, response);
    }
  }
}
