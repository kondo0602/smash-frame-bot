import {
  Client,
  WebhookEvent,
  TextMessage,
} from '@line/bot-sdk';
import { CommandData } from '../../type/CommandData';
import { CommandDataRepository } from '../../src/infrastructure/command-data-repository';

const formatCharacterName = async (nickName: string) => {
  let characterName = '';

  switch (nickName) {
    case 'マリオ':
      characterName = '01_マリオ';
      break;
    case 'ドンキーコング':
    case 'DK':
      characterName = '02_ドンキーコング';
      break;
    case 'リンク':
      characterName = '03_リンク';
      break;
    case 'サムス':
    case 'ダークサムス':
    case 'ダムス':
      characterName = '04_サムス';
      break;
    case 'ヨッシー':
      characterName = '05_ヨッシー';
      break;
    case 'カービィ':
      characterName = '06_カービィ';
      break;
    case 'フォックス':
      characterName = '07_フォックス';
      break;
    case 'ピカチュウ':
      characterName = '08_ピカチュウ';
      break;
    case 'ルイージ':
      characterName = '09_ルイージ';
      break;
    case 'ネス':
      characterName = '10_ネス';
      break;
    case 'キャプテン・ファルコン':
    case 'CF':
      characterName = '11_キャプテン・ファルコン';
      break;
    case 'プリン':
      characterName = '12_プリン';
      break;
    case 'ピーチ':
      characterName = '13_ピーチ';
      break;
    case 'クッパ':
      characterName = '14_クッパ';
      break;
    case 'アイスクライマー':
    case 'アイクラ':
      characterName = '15_アイスクライマー';
      break;
    case 'シーク':
      characterName = '16_シーク';
      break;
    case 'ゼルダ':
      characterName = '17_ゼルダ';
      break;
    case 'ドクターマリオ':
    case 'ドクマリ':
      characterName = '18_ドクターマリオ';
      break;
    case 'ピチュー':
      characterName = '19_ピチュー';
      break;
    case 'ファルコ':
      characterName = '20_ファルコ';
      break;
    case 'ルキナ':
      characterName = '21_ルキナ';
      break;
    case 'こどもリンク':
    case 'こどリン':
    case 'ヤンリン':
      characterName = '22_こどもリンク';
      break;
    case 'ガノンドロフ':
    case 'ガノン':
      characterName = '23_ガノンドロフ';
      break;
    case 'ミュウツー':
      characterName = '24_ミュウツー';
      break;
    case 'ロイ':
      characterName = '25_ロイ';
      break;
    case 'ゲームウォッチ':
    case 'ゲムヲ':
    case 'ゲッチ':
      characterName = '26_Mr';
      break;
    case 'メタナイト':
      characterName = '27_メタナイト';
      break;
    case 'ピット':
    case 'ブラックピット':
    case 'ブラピ':
      characterName = '28_ピット';
      break;
    case 'ゼロスーツサムス':
    case 'ゼロサム':
    case 'ZSS':
      characterName = '29_ゼロスーツサムス';
      break;
    case 'ワリオ':
      characterName = '30_ワリオ';
      break;
    case 'スネーク':
      characterName = '31_スネーク';
      break;
    case 'アイク':
      characterName = '32_アイク';
      break;
    case 'ゼニガメ':
      characterName = '33_ゼニガメ';
      break;
    case 'フシギソウ':
      characterName = '34_フシギソウ';
      break;
    case 'リザードン':
      characterName = '35_リザードン';
      break;
    case 'ディディーコング':
    case 'ディディー':
    case 'DD':
      characterName = '36_ディディーコング';
      break;
    case 'リュカ':
      characterName = '37_リュカ';
      break;
    case 'ソニック':
      characterName = '38_ソニック';
      break;
    case 'デデデ':
      characterName = '39_デデデ';
      break;
    case 'ピクミン&オリマー':
    case 'ピクオリ':
      characterName = '40_ピクミン&オリマー';
      break;
    case 'ルカリオ':
      characterName = '41_ルカリオ';
      break;
    case 'ロボット':
      characterName = '42_ロボット';
      break;
    case 'トゥーンリンク':
    case 'トゥーン':
    case 'トリン':
      characterName = '43_トゥーンリンク';
      break;
    case 'ウルフ':
      characterName = '44_ウルフ';
      break;
    case 'むらびと':
      characterName = '45_むらびと';
      break;
    case 'ロックマン':
      characterName = '46_ロックマン';
      break;
    case 'Wii Fit トレーナー':
    case 'フィットレ':
      characterName = '47_Wii Fit トレーナー';
      break;
    case 'ロゼッタ&チコ':
    case 'ロゼチコ':
      characterName = '48_ロゼッタ&チコ';
      break;
    case 'リトル・マック':
    case 'マック':
    case 'トルマク':
      characterName = '49_リトル・マック';
      break;
    case 'ゲッコウガ':
      characterName = '50_ゲッコウガ';
      break;
    case '格闘Mii':
      characterName = '51_格闘Mii';
      break;
    case '剣術Mii':
      characterName = '52_剣術Mii';
      break;
    case '射撃Mii':
    case 'シャゲミ':
      characterName = '53_射撃Mii';
      break;
    case 'パルテナ':
      characterName = '54_パルテナ';
      break;
    case 'パックマン':
      characterName = '55_パックマン';
      break;
    case 'ルフレ':
      characterName = '56_ルフレ';
      break;
    case 'シュルク':
      characterName = '57_シュルク';
      break;
    case 'クッパJr':
    case 'クッパジュニア':
    case 'ジュニア':
    case 'パジュニ':
      characterName = '58_クッパJr';
      break;
    case 'ダックハント':
      characterName = '59_ダックハント';
      break;
    case 'リュウ':
      characterName = '60_リュウ';
      break;
    case 'クラウド':
      characterName = '61_クラウド';
      break;
    case 'カムイ':
      characterName = '62_カムイ';
      break;
    case 'ベヨネッタ':
    case 'ベヨ':
      characterName = '63_ベヨネッタ';
      break;
    case 'インクリング':
      characterName = '64_インクリング';
      break;
    case 'リドリー':
      characterName = '65_リドリー';
      break;
    case 'シモン':
      characterName = '66_シモン';
      break;
    case 'キングクルール':
    case 'キンクル':
    case 'クルール':
      characterName = '67_キングクルール';
      break;
    case 'しずえ':
      characterName = '68_しずえ';
      break;
    case 'ガオガエン':
    case 'ガエン':
      characterName = '69_ガオガエン';
      break;
    case 'パックンフラワー':
    case 'パックン':
      characterName = '70_パックンフラワー';
      break;
    case 'ジョーカー':
      characterName = '71_ジョーカー';
      break;
    case '勇者':
      characterName = '72_勇者';
      break;
    case 'バンジョー&カズーイ':
    case 'バンカズ':
      characterName = '73_バンジョー&カズーイ';
      break;
    case 'テリー':
      characterName = '74_テリー';
      break;
    case 'ベレトス':
    case 'ベレト':
    case 'ベレス':
      characterName = '75_ベレト';
      break;
    case 'ミェンミェン':
    case '麺':
      characterName = '76_ミェンミェン';
      break;
    case 'スティーブ':
    case 'アレックス':
      characterName = '77_スティーブ';
      break;
    case 'セフィロス':
      characterName = '78_セフィロス';
      break;
    case 'ホムラ':
      characterName = '79_ホムラ';
      break;
    case 'ヒカリ':
      characterName = '80_ヒカリ';
      break;
    case 'カズヤ':
      characterName = '81_カズヤ';
      break;
    case 'ソラ':
      characterName = '82_ソラ';
      break;
    default:
      characterName = '該当なし';
  }

  return characterName;
};

const isolateNameAndCommand = async (message: string) => {
  const characterNameList = ['マリオ', 'まりお', 'ルイージ', 'プリン'];
  let formattedCharacterName = '';
  let command = '';

  for (const characterName of characterNameList) {
    if (message.startsWith(characterName)) {
      formattedCharacterName = await formatCharacterName(characterName);
      command = message.slice(characterName.length);
    }
  }

  return [formattedCharacterName, command];
};


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
  private readonly client:Client
  private readonly commandDataRepo:CommandDataRepository

public constructor (client: Client, commandDataRepo: CommandDataRepository) {
  this.client = client
  this.commandDataRepo = commandDataRepo
}

  public async do(replyToken: string, text:string) {
    let characterName: string, command: string;
    [characterName, command] = await isolateNameAndCommand(text);

    console.log(`入力されたキャラクター名：${characterName}`);
    console.log(`入力されたコマンド：${command}`);

    const characterData = await this.commandDataRepo.getCharacterData(characterName);

    const replyMessage: string = buildReplyMessage(characterData, command);

    // Create a new message.
    const response: TextMessage = {
      type: 'text',
      text: replyMessage,
    };

    // Reply to the user.
    this.client.replyMessage(replyToken, response);
  }
}
