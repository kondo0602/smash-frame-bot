import { CommandData } from '../../../type/CommandData';

export class Character {
  private readonly _name: string;
  private readonly _commandDatas: CommandData[];

  public constructor(name: string, commandDatas: CommandData[]) {
    this._name = name;
    this._commandDatas = commandDatas;
  }

  get name(): string {
    return this._name;
  }

  get commandDatas(): CommandData[] {
    return this._commandDatas;
  }
}
