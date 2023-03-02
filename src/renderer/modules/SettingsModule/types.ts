export enum Language {
  Eng = 'Engish',
  Kor = '한국어'
}

export type Languages = Record<
  Language,
  Record<string, Record<string, string>>
>;
