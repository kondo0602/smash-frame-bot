import fs from 'fs';
import csv from 'csvtojson';
import { CommandData } from '../../type/CommandData';

export class CommandDataRepository {
  public getCharacterData(name: string): Promise<CommandData[]> {
    return new Promise((resolve, reject) => {
      let datas: CommandData[] = [];
      fs.createReadStream(
        __dirname + '/../../../src/infrastructure/csv/' + name + '.csv',
      )
        .pipe(csv().on('data', (data: any) => datas.push(JSON.parse(data))))
        .on('end', () => resolve(datas));
    });
  }
}
