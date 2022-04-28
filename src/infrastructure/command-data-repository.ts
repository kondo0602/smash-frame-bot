import fs from 'fs';
import csv from 'csvtojson';
import { Character } from '../domain/entity/character';
import { CharacterNameVO } from '../domain/entity/character-name-vo';
import { CommandData } from '../../type/CommandData';

export class CommandDataRepository {
  public getCharacter(name: string): Promise<Character> {
    return new Promise((resolve, reject) => {
      let datas: CommandData[] = [];
      fs.createReadStream(
        __dirname + '/../../../src/infrastructure/csv/' + name + '.csv',
      )
        .pipe(csv().on('data', (data: any) => datas.push(JSON.parse(data))))
        .on('end', () =>
          resolve(new Character(new CharacterNameVO(name), datas)),
        );
    });
  }
}
