import { CharacterNameVO } from '../../domain/entity/character-name-vo';

export const isolateNameAndCommand = (message: string) => {
  let isolatedCharacterName = '';
  let isolatedCommand = '';

  for (const characterName of CharacterNameVO.VALID_NICKNAMES) {
    if (message.startsWith(characterName)) {
      isolatedCharacterName = characterName;
      isolatedCommand = message.slice(characterName.length);
    }
  }

  if (isolatedCharacterName === '' || isolatedCommand === '') {
    throw new Error('有効な値を入力してください.');
  }

  console.log(`入力されたキャラクター名：${isolatedCharacterName}`);
  console.log(`入力されたコマンド：${isolatedCommand}`);

  return [isolatedCharacterName, isolatedCommand];
};
