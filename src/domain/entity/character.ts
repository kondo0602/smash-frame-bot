import { CharacterNameVO } from './character-name-vo';
import { CommandData } from '../../../type/CommandData';

export class Character {
  private readonly _name: CharacterNameVO;
  private readonly _commandDatas: CommandData[];

  public constructor(name: CharacterNameVO, commandDatas: CommandData[]) {
    this._name = name;
    this._commandDatas = commandDatas;
  }

  get commandDatas(): CommandData[] {
    return this._commandDatas;
  }
}
