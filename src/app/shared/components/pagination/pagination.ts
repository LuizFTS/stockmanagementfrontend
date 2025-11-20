import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { SelectInput } from '../select-input/select-input';

@Component({
  selector: 'stk-pagination',
  imports: [MatIcon, SelectInput],
  templateUrl: './pagination.html',
  styleUrl: './pagination.scss',
})
export class Pagination {
  @Input() totalItems: number = 1;
  @Input() pageSize: number = 10;
  @Input() currentPage: number = 1;

  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

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
  changePageSize(pageSize: string): void {
    this.pageSize = parseInt(pageSize);
    this.pageSizeChange.emit(this.pageSize);
  }
}
