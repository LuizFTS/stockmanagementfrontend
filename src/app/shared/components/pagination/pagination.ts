import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'stk-pagination',
  imports: [MatIcon],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
})
export class Pagination {
  @Input() totalItems: number = 1;
  @Input() pageSize: number = 10;
  @Input() currentPage: number = 1;

  @Output() pageChange = new EventEmitter<number>();

  get currentPageMinusThree(): number | null {
    if (this.currentPage - 3 >= 1) return this.currentPage - 3;
    return null;
  }
  get currentPageMinusTwo(): number | null {
    if (this.currentPage - 2 >= 1) return this.currentPage - 2;
    return null;
  }
  get currentPageMinusOne(): number | null {
    if (this.currentPage - 1 >= 1) return this.currentPage - 1;
    return null;
  }

  get currentPagePlusOne(): number | null {
    if (this.currentPage + 1 <= this.totalPages) return this.currentPage + 1;
    return null;
  }

  get currentPagePlusTwo(): number | null {
    if (this.currentPage + 2 <= this.totalPages) return this.currentPage + 2;
    return null;
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  /*  get pages(): number[] {
    if (this.totalPages < 4 || this.currentPage === 1) {
      return Array.from({ length: this.totalPages }, (valor, indice) => indice + 1).slice(0, 4);
    }

    if (!this.currentPagePlusOne) {
      return [
        this.currentPageMinusThree!,
        this.currentPageMinusTwo!,
        this.currentPageMinusOne!,
        this.currentPage,
      ];
    }
    if (!this.currentPagePlusTwo) {
      return [
        this.currentPageMinusTwo!,
        this.currentPageMinusOne!,
        this.currentPage,
        this.currentPagePlusOne!,
      ];
    }

    return [
      this.currentPageMinusOne!,
      this.currentPage,
      this.currentPagePlusOne!,
      this.currentPagePlusTwo!,
    ];
  } */

  get pages(): number[] {
    const total = this.totalPages;

    if (total <= 4) {
      return this.range(1, total);
    }

    const firstPage = 1;
    const lastPage = total;

    let start = this.currentPage - 1;
    let end = this.currentPage + 2;

    if (start < firstPage) {
      start = firstPage;
      end = firstPage + 3;
    }

    if (end > lastPage) {
      end = lastPage;
      start = lastPage - 3;
    }

    return this.range(start, end);
  }

  private range(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  changePage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.pageChange.emit(page);
  }
}
