import { CommandData } from '../../../type/CommandData';

export const buildReplyMessage = (json: CommandData[], command: string) => {
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
