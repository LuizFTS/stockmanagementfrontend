import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'stk-search-input',
  imports: [MatIcon, ReactiveFormsModule],
  templateUrl: './search-input.html',
  styleUrl: './search-input.scss',
})
export class SearchInput {
  @Input() placeholder: string = '';
  @Output() searchChange = new EventEmitter<string>();

  searchControl = new FormControl('');

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(debounceTime(200))
      .subscribe((value) => this.searchChange.emit(value ?? ''));
  }
}
