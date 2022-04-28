export const isolateNameAndCommand = (message: string) => {
  const characterNameList = ['マリオ', 'まりお', 'ルイージ', 'プリン'];

  let isolatedCharacterName = '';
  let command = '';

  for (const characterName of characterNameList) {
    if (message.startsWith(characterName)) {
      isolatedCharacterName = characterName;
      command = message.slice(characterName.length);
    }
  }

  console.log(`入力されたキャラクター名：${isolatedCharacterName}`);
  console.log(`入力されたコマンド：${command}`);

  return [isolatedCharacterName, command];
};
