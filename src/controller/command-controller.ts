import {
  ClientConfig,
  Client,
  middleware,
  MiddlewareConfig,
  WebhookEvent,
} from '@line/bot-sdk';
import { GetCommandDataUsecase } from '../usecase/get-command-data-usecase';
import { CommandDataRepository } from '../infrastructure/command-data-repository';

// Setup all LINE client and Express configurations.
const clientConfig: ClientConfig = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN || '',
  channelSecret: process.env.CHANNEL_SECRET,
};

// Create a new LINE SDK client.
const client = new Client(clientConfig);

export class CommandController {
  public async searchCommand(req: Request, res: Response): Promise<Response> {
    const events: WebhookEvent[] = req.body.events;

    const repo = new CommandDataRepository();
    // Process all of the received events asynchronously.
    const events: WebhookEvent[] = req.body.events;

    const repo = new CommandDataRepository();
    // Process all of the received events asynchronously.
    const results = await Promise.all(
      events.map(async (event: WebhookEvent) => {
        try {
          if (event.type !== 'message' || event.message.type !== 'text') {
            return;
          }

          const { replyToken } = event;

          const getCommandDataUsecase = new GetCommandDataUsecase(client, repo);
          await getCommandDataUsecase.do(replyToken, event.message.text);
        } catch (err: unknown) {
          if (err instanceof Error) {
            console.error(err);
          }

          // Return an error message.
          return res.status(500).json({
            status: 'error',
          });
        }
      }),
    );

    // Return a successfull message.
    return res.status(200).json({
      status: 'success',
      results,
    });
  }
}
