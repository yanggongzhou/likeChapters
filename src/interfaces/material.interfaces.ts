export interface IMaterialListItem {
  id: string;
  materialName: string;
  materialType: string;
  materialUrl: string;
}

export interface IMaterialParams {
  id?: string;
  materialName: string;
  materialType: string;
  materialUrl: string;
}

export enum MaterialTypeEnum {
  look = 'LOOK',
  background = 'BG',
  bgm = 'BGM',
}

export enum LookTypeEnum {
  skin = 'SKIN',
  emotion = 'EMOTION',
  hair = 'HAIR',
  cloth = 'CLOTH',
  backext = 'BACKEXT',
}
