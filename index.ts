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
      characterName = "01_マリオ";
      break;
    case "ドンキーコング":
      characterName = "02_ドンキーコング";
      break;
    case "リンク":
      characterName = "03_リンク";
      break;
    case "サムス":
      characterName = "04_サムス";
      break;
    case "ヨッシー":
      characterName = "05_ヨッシー";
      break;
    case "カービィ":
      characterName = "06_カービィ";
      break;
    case "フォックス":
      characterName = "07_フォックス";
      break;
    case "ピカチュウ":
      characterName = "08_ピカチュウ";
      break;
    case "ルイージ":
      characterName = "09_ルイージ";
      break;
    case "ネス":
      characterName = "10_ネス";
      break;
    case "キャプテン・ファルコン":
      characterName = "11_キャプテン・ファルコン";
      break;
    case "プリン":
      characterName = "12_プリン";
      break;
    case "ピーチ":
      characterName = "13_ピーチ";
      break;
    case "クッパ":
      characterName = "14_クッパ";
      break;
    case "アイスクライマー":
      characterName = "15_アイスクライマー";
      break;
    case "シーク":
      characterName = "16_シーク";
      break;
    case "ゼルダ":
      characterName = "17_ゼルダ";
      break;
    case "ドクターマリオ":
      characterName = "18_ドクターマリオ";
      break;
    case "ピチュー":
      characterName = "19_ピチュー";
      break;
    case "ファルコ":
      characterName = "20_ファルコ";
      break;
    case "ルキナ":
      characterName = "21_ルキナ";
      break;
    case "こどもリンク":
      characterName = "22_こどもリンク";
      break;
    case "ガノンドロフ":
      characterName = "23_ガノンドロフ";
      break;
    case "ミュウツー":
      characterName = "24_ミュウツー";
      break;
    case "ロイ":
      characterName = "25_ロイ";
      break;
    case "Mr":
      characterName = "26_Mr";
      break;
    case "メタナイト":
      characterName = "27_メタナイト";
      break;
    case "ピット":
      characterName = "28_ピット";
      break;
    case "ゼロスーツサムス":
      characterName = "29_ゼロスーツサムス";
      break;
    case "ワリオ":
      characterName = "30_ワリオ";
      break;
    case "スネーク":
      characterName = "31_スネーク";
      break;
    case "アイク":
      characterName = "32_アイク";
      break;
    case "ゼニガメ":
      characterName = "33_ゼニガメ";
      break;
    case "フシギソウ":
      characterName = "34_フシギソウ";
      break;
    case "リザードン":
      characterName = "35_リザードン";
      break;
    case "ディディーコング":
      characterName = "36_ディディーコング";
      break;
    case "リュカ":
      characterName = "37_リュカ";
      break;
    case "ソニック":
      characterName = "38_ソニック";
      break;
    case "デデデ":
      characterName = "39_デデデ";
      break;
    case "ピクミン&オリマー":
      characterName = "40_ピクミン&オリマー";
      break;
    case "ルカリオ":
      characterName = "41_ルカリオ";
      break;
    case "ロボット":
      characterName = "42_ロボット";
      break;
    case "トゥーンリンク":
      characterName = "43_トゥーンリンク";
      break;
    case "ウルフ":
      characterName = "44_ウルフ";
      break;
    case "むらびと":
      characterName = "45_むらびと";
      break;
    case "ロックマン":
      characterName = "46_ロックマン";
      break;
    case "Wii Fit トレーナー":
      characterName = "47_Wii Fit トレーナー";
      break;
    case "ロゼッタ&チコ":
      characterName = "48_ロゼッタ&チコ";
      break;
    case "リトル・マック":
      characterName = "49_リトル・マック";
      break;
    case "ゲッコウガ":
      characterName = "50_ゲッコウガ";
      break;
    case "格闘Mii":
      characterName = "51_格闘Mii";
      break;
    case "剣術Mii":
      characterName = "52_剣術Mii";
      break;
    case "射撃Mii":
      characterName = "53_射撃Mii";
      break;
    case "パルテナ":
      characterName = "54_パルテナ";
      break;
    case "パックマン":
      characterName = "55_パックマン";
      break;
    case "ルフレ":
      characterName = "56_ルフレ";
      break;
    case "シュルク":
      characterName = "57_シュルク";
      break;
    case "クッパ Jr":
      characterName = "58_クッパJr";
      break;
    case "ダックハント":
      characterName = "59_ダックハント";
      break;
    case "リュウ":
      characterName = "60_リュウ";
      break;
    case "クラウド":
      characterName = "61_クラウド";
      break;
    case "カムイ":
      characterName = "62_カムイ";
      break;
    case "ベヨネッタ":
      characterName = "63_ベヨネッタ";
      break;
    case "インクリング":
      characterName = "64_インクリング";
      break;
    case "リドリー":
      characterName = "65_リドリー";
      break;
    case "シモン":
      characterName = "66_シモン";
      break;
    case "キングクルール":
      characterName = "67_キングクルール";
      break;
    case "しずえ":
      characterName = "68_しずえ";
      break;
    case "ガオガエン":
      characterName = "69_ガオガエン";
      break;
    case "パックンフラワー":
      characterName = "70_パックンフラワー";
      break;
    case "ジョーカー":
      characterName = "71_ジョーカー";
      break;
    case "勇者":
      characterName = "72_勇者";
      break;
    case "バンジョー&カズーイ":
      characterName = "73_バンジョー&カズーイ";
      break;
    case "テリー":
      characterName = "74_テリー";
      break;
    case "ルフレ":
      characterName = "75_ルフレ";
      break;
    case "ミェンミェン":
      characterName = "76_ミェンミェン";
      break;
    case "スティーブ":
      characterName = "77_スティーブ";
      break;
    case "セフィロス":
      characterName = "78_セフィロス";
      break;
    case "ホムラ":
      characterName = "79_ホムラ";
      break;
    case "ヒカリ":
      characterName = "80_ヒカリ";
      break;
    case "カズヤ":
      characterName = "81_カズヤ";
      break;
    case "ソラ":
      characterName = "82_ソラ";
      break;
    default:
      characterName = "該当なし"
  }

  return characterName;
}

function buildReplyMessage(json: string[], command: string) {
  // const list = ['技カテゴリ', '技名', '判定持続', '全体フレーム', '基礎ダメージ', 'ダメージ (1v1)', 'ダメ (1v1+小J)', 'ガード硬直', '慣性消去', '着地隙', '着地隙発生F', '慣性反転', ’向き反転', '無敵フレーム', '無敵 (ペナ最大)', '全体 (ペナ最大)'];
  const list: string[] = [
    "技名",
    "判定持続",
    "全体フレーム",
    "ガード硬直",
    "着地隙",
    "着地隙発生F",
    "慣性反転",
    "向き反転",
    "無敵フレーム",
    "無敵 (ペナ最大)",
    "全体 (ペナ最大)",
  ];
  let replyMessage = "";

  json.forEach((data) => {
    if (data["技カテゴリ"] === command || data["技名"].startsWith(command)) {
      list.forEach((elem) => {
        if (elem === "技名") {
          if (replyMessage === "") {
            replyMessage += `${elem}：${data[elem]}`;
          } else {
            replyMessage += `\r\r${elem}：${data[elem]}`;
          }
        } else {
          if (data[elem] !== "") {
            replyMessage += `\r${elem}：${data[elem]}`;
          }
        }
      });
    }
  });

  return replyMessage;
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

  // Read frame sheet.
  fs.createReadStream(__dirname + "/../csv/" + characterName + ".csv").pipe(
    csv.parse({ columns: true }, function (err: unknown, json: JSON) {

      // Process all message related variables here.
      const { replyToken } = event;
      const text: string = characterName;

      const replyMessage: string = buildReplyMessage(json, command);

      // Create a new message.
      const response: TextMessage = {
        type: 'text',
        text: replyMessage,
      };

      // Reply to the user.
      return client.replyMessage(replyToken, response);
    })
  );

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
