export enum Language {
  Eng = 'Engish',
  Kor = 'Korean'
}

export type Languages = Record<
  Language,
  Record<string, Record<string, string>>
>;
