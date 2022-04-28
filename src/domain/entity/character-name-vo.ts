export class CharacterNameVO {
  static readonly VALID_NICKNAMES: string[] = [
    'マリオ',
    'ドンキー',
    'リンク',
    'サムス',
    'ヨッシー',
    'カービィ',
    'フォックス',
    'ピカチュウ',
  ];

  static readonly VALID_NAMES: string[] = [
    '01_マリオ',
    '02_ドンキー',
    '03_リンク',
    '04_サムス',
    '05_ヨッシー',
    '06_カービィ',
    '07_フォックス',
    '08_ピカチュウ',
  ];

  private readonly _value: string;

  public constructor(name: string) {
    if (!CharacterNameVO.VALID_NAMES.includes(name)) {
      throw new Error('有効なキャラクター名ではありません.');
    }

    this._value = name;
  }
}
