import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, input, output, viewChild } from '@angular/core';

import type { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'gifs-masonry-grid',
  templateUrl: './masonry-grid.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MasonryGrid implements AfterViewInit {
  groups = input.required<Gif[][]>();
  initialScrollTop = input(0);

  scrolledToBottom = output<void>();
  scrollPositionChange = output<number>();

  private scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('scrollDiv');

  ngAfterViewInit(): void {
    const div = this.scrollDivRef()?.nativeElement;
    if (div) div.scrollTop = this.initialScrollTop();
  }

  onScroll(): void {
    const div = this.scrollDivRef()?.nativeElement;
    if (!div) return;

    const { scrollTop, scrollHeight, clientHeight } = div;
    this.scrollPositionChange.emit(scrollTop);

    //isAtBottom
    if (scrollTop + clientHeight + 300 >= scrollHeight) {
      this.scrolledToBottom.emit();
    }
  }
}
