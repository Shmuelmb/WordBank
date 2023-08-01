export interface wordType {
  word: string;
  translate: string;
}

export interface userType {
  email: string;
  name: string;
  words: wordType[];
}
