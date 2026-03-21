import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';

const GIF_KEY = 'gifs_history';

const loadFromLocalStorage = () => {
  const gifsFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '{}'; //Record<string, Gif[]>
  const gifs = JSON.parse(gifsFromLocalStorage);
  console.log({ gifs });
  return gifs;

}

@Injectable({ providedIn: 'root' })
export class GifsService {

  private http = inject(HttpClient);
  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(true);
  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  constructor() {
    this.loadTrendingGifs();
    console.log('gif service')
  }

  saveToLocalStorage = effect(() => {
    localStorage.setItem(GIF_KEY, JSON.stringify(this.searchHistory()));
  });

  loadTrendingGifs() {
    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
      params: {
        api_key: environment.apiKey,
        limit: '50'
      }
    }).subscribe(response => {
      //console.log(response);
      const gifs = GifMapper.mapGiphyItemsToGifArray(response.data);
      console.log(gifs);
      this.trendingGifs.set(gifs);
      this.trendingGifsLoading.set(false);
    });
  }

  // retorna el observable para que el componente se suscriba y maneje la respuesta
  searchGifs(query: string): Observable<Gif[]> {
    this.trendingGifsLoading.set(true);
    query = query.trim().toLowerCase();

    return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
      params: {
        api_key: environment.apiKey,
        q: query,
        limit: '50'
      }
    }).pipe(
      map(({ data }) => GifMapper.mapGiphyItemsToGifArray(data)),
      // TODO manejar historial
      // tap para disparar efectos secundarios
      tap(items => {
        // return inplicito ()
        this.searchHistory.update(history => ({
          ...history,
          [query]: items
        }));
        this.trendingGifsLoading.set(false);
      })
    );
  }

  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query] || [];
  }
}
