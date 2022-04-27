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

  return [isolatedCharacterName, command];
};
