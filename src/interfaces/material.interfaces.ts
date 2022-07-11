export interface IMaterialListItem {
  id: string;
  materialName: string;
  materialType: MaterialTypeEnum;
  lookType: LookTypeEnum;
  materialUrl: string;
}

export interface IMaterialParams {
  id?: string;
  materialName?: string;
  materialType: MaterialTypeEnum;
  lookType: LookTypeEnum;
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
  SKIN = 'skin',
  EMOTION = 'emotion',
  HAIR = 'hair',
  CLOTH = 'cloth',
  BACKEXT = 'backext',
}
