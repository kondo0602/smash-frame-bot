// Import all dependencies, mostly using destructuring for better view.
import { middleware, MiddlewareConfig, WebhookEvent } from '@line/bot-sdk';
import express, { Application, Request, Response } from 'express';
import { CommandController } from './controller/command-controller';

require('dotenv').config();

const middlewareConfig: MiddlewareConfig = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET || '',
};

// Create a new Express application.
const app: Application = express();

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
          if (event.type === 'message' && event.message.type === 'text') {
            const commandController = new CommandController();
            commandController.search(event);
          } else {
            return;
          }
        } catch (err: any) {
          console.error(err);

          return res.status(500).json({
            status: 'error',
          });
        }
      }),
    );

    return res.status(200).json({
      status: 'success',
      results,
    });
  },
);

const PORT = process.env.PORT || 3000;

// Create a server and listen to it.
app.listen(PORT, () => {
  console.log(`Application is live and listening on port ${PORT}`);
});
