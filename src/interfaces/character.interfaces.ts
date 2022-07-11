import { EBoolean } from "@/interfaces/common.interfaces";

export interface ICharacterListItem {
  id: string;
  bookId: string;
  characterName: string;
  characterIntro?: string;
  sex: SexType;
  mainCharacter: EBoolean;
  dressUp?: IDressUpItem[];
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

export interface IDressUpItem {
  id: string;
  name: string;
  isDefault: EBoolean;
  skin?: ISkin;
  cloth?: ISkin;
  emotion?: ISkin;
  hair?: ISkin;
  backext?: ISkin;
}
