import { EBoolean } from "@/interfaces/common.interfaces";

export interface ICharacterListItem {
  id: string;
  bookId: string;
  characterName: string;
  characterIntro?: string;
  sex: SexType;
  mainCharacter: EBoolean;
  dressUp?: IDressUp;
}

export interface ICharacterParams {
  id?: string;
  bookId: string;
  characterName: string;
  characterIntro?: string;
  sex: SexType.boy,
  mainCharacter: EBoolean.no,
}

export enum SexType {
  boy = 1,
  girl = 2
}

interface ISkin {
  id: string;
  url: string;
}

export interface IDressUp {
  skin?: ISkin;
  cloth?: ISkin;
  emotion?: ISkin;
  hair?: ISkin;
  backext?: ISkin;
}
