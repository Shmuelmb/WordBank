export interface wordType {
  word: String;
  translate: String;
}

export interface userType {
  email: String;
  name: String;
  words: wordType[];
}
