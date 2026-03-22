import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
//import { GifList } from "../../components/gif-list/gif-list";
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';
import { ScrollStateService } from '../../../shared/services/scroll-state.service';

@Component({
  selector: 'app-search-page',
  //imports: [GifList],
  templateUrl: './search-page.html',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SearchPage {


  gifService = inject(GifsService);
  scrollStateService = inject(ScrollStateService);
  gifs = signal<Gif[]>([]);
  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');


  onSearch(query: string) {
    console.log({ query });
    this.gifService.trendingGifsSearch.set([]);
    this.gifService.searchGifs(query).subscribe(response => {
      //console.log({ response });
      this.gifs.set(response);
      //console.log('fin')
    });
  }

  onScroll(event: Event, txtSearch: HTMLInputElement) {
    //console.log(event)
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    //console.log({ scrollDiv });

    const scrollTop = scrollDiv.scrollTop;
    const scrollHeight = scrollDiv.scrollHeight;
    const clientHeight = scrollDiv.clientHeight; // tamaño del viewPort

    //console.log({ scrollTop, scrollHeight, clientHeight });
    //console.log({ scrollTotal: scrollTop + clientHeight, scrollHeight })

    const isAtBottom = scrollTop + clientHeight + 300 >= scrollHeight; // margen de error de 10px
    this.scrollStateService.searchScrollState.set(scrollTop);

    if (isAtBottom) {
      //console.log('Has llegado al final del scroll');
      this.gifService.searchGifs(txtSearch.value).subscribe(response => {
        //console.log({ response });
        this.gifs.update(gis => [...gis, ...response]);
      });
    }
  }
}
