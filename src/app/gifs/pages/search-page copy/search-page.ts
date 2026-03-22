import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { ScrollStateService } from '../../../shared/services/scroll-state.service';
import { MasonryGrid } from '../../components/masonry-grid/masonry-grid';

@Component({
  selector: 'app-search-page',
  imports: [MasonryGrid],
  templateUrl: './search-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SearchPage {
  gifService = inject(GifsService);
  scrollStateService = inject(ScrollStateService);
  currentQuery = signal('');

  onSearch(query: string): void {
    this.currentQuery.set(query);
    this.gifService.trendingGifsSearch.set([]);
    this.gifService.searchGifs(query).subscribe();
  }

  onScrolledToBottom(): void {
    const query = this.currentQuery();
    if (query) this.gifService.searchGifs(query).subscribe();
  }
}
