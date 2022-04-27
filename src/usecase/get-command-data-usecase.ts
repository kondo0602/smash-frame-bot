import { Client, TextMessage } from '@line/bot-sdk';
import { CommandData } from '../../type/CommandData';
import { CommandDataRepository } from '../../src/infrastructure/command-data-repository';
import { formatCharacterName } from './__shared__/format-character-name';

const buildReplyMessage = (json: CommandData[], command: string) => {
  const list: string[] = [
    '技名',
    '判定持続',
    '全体フレーム',
    'ガード硬直',
    '着地隙',
    '着地隙発生F',
    '慣性反転',
    '向き反転',
    '無敵フレーム',
    '無敵 (ペナ最大)',
    '全体 (ペナ最大)',
  ];
  let replyMessage = '';

  json.forEach((data: CommandData) => {
    if (data['技カテゴリ'] === command || data['技名'].startsWith(command)) {
      list.forEach((elem: string) => {
        if (elem === '技名') {
          if (replyMessage === '') {
            replyMessage += `${elem}：${data[elem]}`;
          } else {
            replyMessage += `\r\r${elem}：${data[elem]}`;
          }
        } else {
          if (data[elem] !== '') {
            replyMessage += `\r${elem}：${data[elem]}`;
          }
        }
      });
    }
  });

  return replyMessage;
};

export class GetCommandDataUsecase {
  private readonly client: Client;
  private readonly commandDataRepo: CommandDataRepository;

  public constructor(client: Client, commandDataRepo: CommandDataRepository) {
    this.client = client;
    this.commandDataRepo = commandDataRepo;
  }

  public async do(
    replyToken: string,
    name: string,
    command: string,
  ): Promise<void> {
    const formattedCharacterName = formatCharacterName(name);

    console.log(`入力されたキャラクター名：${formattedCharacterName}`);
    console.log(`入力されたコマンド：${command}`);

    const character = await this.commandDataRepo.getCharacter(
      formattedCharacterName,
    );

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
    this.client.replyMessage(replyToken, response);
  }
}
