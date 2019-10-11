export interface DimensionType {
  x?: number;
  y?: number;
  z?: number;
  width?: number;
  scale?: number;
}

export interface GenderType {
  svg?: String[];
  dimensions?: DimensionType;
}

export interface SvgType {
  male?: GenderType;
  female?: GenderType;
}