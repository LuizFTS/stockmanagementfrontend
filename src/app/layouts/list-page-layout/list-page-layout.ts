import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SearchInput } from '../../shared/components/search-input/search-input';
import { Button } from '../../shared/components/button/button';
import { Card } from '../../shared/components/card/card';
import { Pagination } from '../../shared/components/pagination/pagination';
import { ReactiveFormsModule, type FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'stk-list-page-layout',
  imports: [SearchInput, Button, Card, Pagination, ReactiveFormsModule],
  templateUrl: './list-page-layout.html',
  styleUrl: './list-page-layout.scss',
})
export class ListPageLayout {
  @Input() autoCompleteService: any;
  @Input() title!: string;
  @Input() subtitle: string = '';
  @Input() searchForm!: FormGroup;
  @Input() searchPlaceholder: string = '';
  @Input() searchName!: string;
  @Input() activeStatus: boolean = true;

  @Input() page: number = 1;
  @Input() pageSize: number = 10;
  @Input() totalItems: number = 0;

  @Input() hasAddButton: boolean = true;
  @Input() navigatePathToAdd: string = '';
  @Input() addButtonText: string = '';

  @Output() searchChange = new EventEmitter<string>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  constructor(private router: Router) {}

  onSearch(event: string) {
    this.searchChange.emit(event);
  }

  onSearchSubmit(event: Event) {
    event.preventDefault();
    this.searchChange.emit(this.searchForm.value[this.searchName]);
  }

  changePage(page: number) {
    this.pageChange.emit(page);
  }

  changePageSize(pageSize: number) {
    this.pageSizeChange.emit(pageSize);
  }

  navigate() {
    this.router.navigate([this.navigatePathToAdd]);
  }
}
