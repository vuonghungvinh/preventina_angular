import { Headers } from '@angular/http';
import * as _ from 'lodash';
import { PosterType, PosterPartType, ThingType } from '../types/'

import { DEFAULT_POSTER } from '../default-data';

export const makeDefaultHeaders = () => {
  return { headers: new Headers({ 'Content-Type': 'application/json' }) };
};


const typeCache: { [label: string]: boolean } = {};

/**
 * This function coerces a string into a string literal type.
 * Using tagged union types in TypeScript 2.0, this enables
 * powerful typechecking of our reducers.
 *
 * Since every action label passes through this function it
 * is a good place to ensure all of our action labels
 * are unique.
 */
export function type<T>(label: T | ''): T {
  if (typeCache[<string>label]) {
    throw new Error(`Action type "${label}" is not unqiue"`);
  }

  typeCache[<string>label] = true;

  return <T>label;
}

export function makeDefaultPoster() {
  return _.assign({
    tempId: (91253123 + _.random(100500) * 39812).toString(),
  }, DEFAULT_POSTER);
}

export function hasGearInPoster(poster: PosterType, gear: ThingType){
	//1. find part
	let p: PosterPartType = getTypePart(poster, gear.type);
	//2. check gear in part
	if(p)
		return hasGearInPart(p, gear);
}

export function hasGearInPart(posterPart: PosterPartType, gear: ThingType){
	return _.find(posterPart.things, (t: ThingType) => {
		return _.isEqual(t, gear);
	});
}

export function getGearFromPoster(poster: PosterType, thing: ThingType){
	let part: PosterPartType = _.find(poster.parts, (p: PosterPartType) => {
		return p.type = thing.type;
	});
	return getGearFromPart(part, thing.uuid);
}

export function getGearFromPart(part: PosterPartType, uuid: string){
	return _.find(part.things, (t: ThingType) => {
		return t.uuid === uuid; 
	});
}

export function addGearToPoster(poster: PosterType, thing: ThingType){
  if(!poster['parts'])
    poster['parts'] = [];
  if(!poster['stuff'])
    poster['stuff'] = [];

  let part: PosterPartType = getTypePart(poster, thing.type)
  if(!part){
  	part = {};
  	part.things = [];
  	part.type = thing.type;
	  part.things.push(thing);
	  poster.parts.push(part);
  }
  else{
	  part.things.push(thing);
  }
  poster.stuff.push(thing);
}

export function removeGearFromPoster(poster: PosterType, thing: ThingType){
	let part: PosterPartType = getTypePart(poster, thing.type);
	if(part && part.things)
		_.remove(part.things, (t) => {
			if(t.uuid === thing.uuid)
				console.log('BOTH ARE EQUAL THIS SHOULD BE REMOVED');
			return t.uuid === thing.uuid;
		});
	if(poster && poster.stuff)
		_.remove(poster.stuff, (t) => {
			return t.uuid === thing.uuid;
		});
}

export function getAllUsedThingsAlternatives(poster: PosterType){
	let allUsedThings = [];
	_.every(poster.parts, (part: PosterPartType) => {
		_.every(part.things, (thing: ThingType) => {
			allUsedThings.push(thing.associateId);
		})
	});
	return allUsedThings;
}

export function getAllUsedThings(poster: PosterType){
	let allUsedThings: ThingType[] = [];
	_.every(poster.parts, (part: PosterPartType) => {
		_.every(part.things, (thing: ThingType) => {
			allUsedThings.push(thing);
		})
	});
	return allUsedThings;
}

function getTypePart(poster: PosterType, type: string){
	return _.find(poster.parts, (part: PosterPartType) => {
		return part.type === type;
	});
}
