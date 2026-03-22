import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollStateService {

  trendingScrollState = signal(0);
  searchScrollState = signal(0);

  //ageScrollState = signal<Record<string, number>>({});

}
