import { Component, inject } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';
import { ScrollStateService } from '../../../shared/services/scroll-state.service';
import { MasonryGrid } from '../../components/masonry-grid/masonry-grid';

@Component({
  selector: 'app-trending-page',
  imports: [MasonryGrid],
  templateUrl: './trending-page.html',
})
export default class TrendingPage {
  gifService = inject(GifsService);
  scrollStateService = inject(ScrollStateService);
}
