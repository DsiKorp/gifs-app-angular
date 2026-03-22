import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';

import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';

const GIF_KEY = 'gifs_history';

const loadFromLocalStorage = () => {
  const gifsFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '{}'; //Record<string, Gif[]>
  const gifs = JSON.parse(gifsFromLocalStorage);
  //console.log({ gifs });
  return gifs;

}

@Injectable({ providedIn: 'root' })
export class GifsService {

  private http = inject(HttpClient);
  trendingGifs = signal<Gif[]>([]);
  trendingGifsSearch = signal<Gif[]>([]);

  trendingGifsLoading = signal(false);
  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));
  private trendingPage = signal(0);
  private trendingPageSearch = signal(0);


  constructor() {
    this.loadTrendingGifs();
    //console.log('gif service')
  }

  saveToLocalStorage = effect(() => {
    localStorage.setItem(GIF_KEY, JSON.stringify(this.searchHistory()));
  });


  trendingGifGroup = computed<Gif[][]>(() => {
    const groups = [];

    for (let i = 0; i < this.trendingGifs().length; i += 3) {
      groups.push(this.trendingGifs().slice(i, i + 3));
    }

    //console.log(groups);
    return groups; // [[g1, g2, g3], [g4, g5, g6], ...]
  });

  // TODO refactorizar para evitar repetir logica con trendingGifGroup
  trendingGifSearchGroup = computed<Gif[][]>(() => {
    const groups = [];

    for (let i = 0; i < this.trendingGifsSearch().length; i += 3) {
      groups.push(this.trendingGifsSearch().slice(i, i + 3));
    }

    //console.log(groups);
    return groups; // [[g1, g2, g3], [g4, g5, g6], ...]
  });

  loadTrendingGifs() {
    if (this.trendingGifsLoading()) return;

    this.trendingGifsLoading.set(true);


    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
      params: {
        api_key: environment.apiKey,
        limit: '21',
        offset: String(this.trendingPage() * 21)
      }
    }).subscribe(response => {
      //console.log(response);
      const gifs = GifMapper.mapGiphyItemsToGifArray(response.data);
      //console.log(gifs);
      // tambien se puede con map y tap
      this.trendingGifs.update(currentGifs => [...currentGifs, ...gifs]);
      this.trendingPage.update(currentPage => currentPage + 1);
      this.trendingGifsLoading.set(false);
    });
  }

  // retorna el observable para que el componente se suscriba y maneje la respuesta
  searchGifs(query: string): Observable<Gif[]> {
    if (this.trendingGifsLoading()) return of(this.trendingGifsSearch());

    this.trendingGifsLoading.set(true);
    query = query.trim().toLowerCase();

    return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
      params: {
        api_key: environment.apiKey,
        q: query,
        limit: '21',
        offset: String(this.trendingPageSearch() * 21)
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
        this.trendingGifsSearch.update(currentGifs => [...currentGifs, ...items]);
        this.trendingPageSearch.update(currentPage => currentPage + 1);
        this.trendingGifsLoading.set(false);
      })
    );
  }

  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query] || [];
  }

}
