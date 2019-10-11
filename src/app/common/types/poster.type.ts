import { ThingType } from '..';

export interface PosterPartType {
  comment?: string;
  commentPosition?: {
    top: string;
    left: string;
  };
  type?: string;
  things?: ThingType[];
}

export interface PosterType {
  id?: string;
  uuid?: string;
  tempId?: string;
  name?: string;
  gender?: ThingType;
  skin?: ThingType;
  //hairs?: PosterPartType;
  //boots?: PosterPartType;
  //jackets?: PosterPartType;
  //sunglasses?: PosterPartType;
  //trousers?: PosterPartType;
  //body?: PosterPartType[];
  parts?: PosterPartType[];
  stuff?: ThingType[];
}


