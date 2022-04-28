import { CommandDataRepository } from '../../src/infrastructure/command-data-repository';
import { formatCharacterName } from './__shared__/format-character-name';
import { Character } from '../domain/entity/character';

export class GetCommandDataUsecase {
  private readonly commandDataRepo: CommandDataRepository;

  public constructor(commandDataRepo: CommandDataRepository) {
    this.commandDataRepo = commandDataRepo;
  }

  public async do(name: string, command: string): Promise<Character> {
    const formattedCharacterName = formatCharacterName(name);

    console.log(`入力されたキャラクター名：${formattedCharacterName}`);
    console.log(`入力されたコマンド：${command}`);

    const character = await this.commandDataRepo.getCharacter(
      formattedCharacterName,
    );

    // TODO: DTOに詰め替えてコントローラに返すように修正
    return character;
  }
}
