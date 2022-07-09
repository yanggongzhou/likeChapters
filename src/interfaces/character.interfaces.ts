export interface ICharacterListItem {
  id: string;
  bookId: string;
  characterName: string;
  characterIntro?: string;
}

export interface ICharacterParams {
  id?: string;
  bookId: string;
  characterName: string;
  characterIntro?: string;
}
