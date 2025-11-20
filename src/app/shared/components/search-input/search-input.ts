import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'stk-search-input',
  imports: [MatIcon, ReactiveFormsModule, MatIconModule],
  templateUrl: './search-input.html',
  styleUrl: './search-input.scss',
})
export class SearchInput {
  @Input() placeholder: string = '';
  @Output() searchChange = new EventEmitter<string>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      search: [''],
    });
  }

  onSearch() {
    const value = this.form.get('search')?.value;
    this.searchChange.emit(value ?? '');
  }
}
