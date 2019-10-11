import { Injectable } from '@angular/core';
import { HttpInterceptorService } from '@covalent/http';

import { API_BASE_URL } from '../config';
import { makeDefaultHeaders } from '../services/utilities.service';
import { PosterType } from '../types/poster.type';

const URL = API_BASE_URL + 'posters';

@Injectable()
export class PosterEndpoint {
  constructor(private http: HttpInterceptorService) {}

  loadPosters() {
    return this.http.get(URL, makeDefaultHeaders())
      .map(res => res.json())
      .publishReplay(1)
      .refCount();
  }

  /**
   * Get poster by ID
   */
  loadPoster(id) {
    return this.http.get(`${URL}/${id}`, makeDefaultHeaders())
      .map(res => res.json())
      .publishReplay(1)
      .refCount();
  }

  /**
   * Update poster (if it has id) or create a new poster
   */
  savePoster(poster) {
    // this.localStorageService.setObject('poster', poster);
    poster = this.deletePosterPropertyNotToPersist(poster);
    return (poster.id) ? this.updatePoster(poster) : this.createPoster(poster);
  }

  updatePoster(poster) {
    return this.http.put(`${URL}/${poster.id}`, JSON.stringify(poster), makeDefaultHeaders())
      .map(res => res.json())
      .publishReplay(1)
      .refCount();
  }

  createPoster(poster) {
    return this.http.post(URL, JSON.stringify(poster), makeDefaultHeaders())
      .map(res => res.json())
      .publishReplay(1)
      .refCount();
  }

  deletePoster(poster) {
    return this.http.delete(`${URL}/${poster.id}`, makeDefaultHeaders())
      .publishReplay(1)
      .refCount();
  }

  deletePosterPropertyNotToPersist(poster: PosterType): PosterType {
    // TODO: Check if need to remove other properties
    const keysToRemove = ['template'];
    for (const prop in poster) {
      if (poster.hasOwnProperty(prop)) {
        keysToRemove.forEach(keyToRemove => delete poster[prop][keyToRemove]);
      }
    }
    return poster;
  }
}
