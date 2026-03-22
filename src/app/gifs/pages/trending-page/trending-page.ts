import { AfterViewInit, Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';
//import { GifList } from "../../components/gif-list/gif-list";
import { GifsService } from 'src/app/gifs/services/gifs.service';
import { ScrollStateService } from '../../../shared/services/scroll-state.service';

// const imageUrls: string[] = [
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg",
//   "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg"
// ];

@Component({
  selector: 'app-trending-page',
  //imports: [GifList],
  templateUrl: './trending-page.html',
})
export default class TrendingPage implements AfterViewInit {



  gifService = inject(GifsService);
  scrollStateService = inject(ScrollStateService);
  //gifs = computed(() => this.gifService.trendingGifs());

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();
  }

  onScroll(event: Event) {
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
    this.scrollStateService.trendingScrollState.set(scrollTop);

    if (isAtBottom) {
      //console.log('Has llegado al final del scroll');
      this.gifService.loadTrendingGifs();
    }
  }

}
