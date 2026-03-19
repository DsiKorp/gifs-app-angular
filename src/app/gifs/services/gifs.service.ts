import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';

@Injectable({ providedIn: 'root' })
export class GifsService {

  private http = inject(HttpClient);
  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(true);

  constructor() {
    this.loadTrendingGifs();
    console.log('gif service')
  }

  loadTrendingGifs() {
    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
      params: {
        api_key: environment.apiKey,
        limit: '20'
      }
    }).subscribe(response => {
      //console.log(response);
      const gifs = GifMapper.mapGiphyItemsToGifArray(response.data);
      console.log(gifs);
      this.trendingGifs.set(gifs);
      this.trendingGifsLoading.set(false);
    });
  }
}
