import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Button } from '../button/button';
import { debounceTime, distinctUntilChanged, filter, switchMap, type Observable } from 'rxjs';
import { TextInput } from '../text-input/text-input';
import { Formatter } from '../../utils/Formatter';

@Component({
  selector: 'stk-search-input',
  imports: [ReactiveFormsModule, MatIconModule, Button, TextInput],
  templateUrl: './search-input.html',
  styleUrl: './search-input.scss',
})
export class SearchInput {
  @ViewChild(TextInput) child!: TextInput;
  @Input() placeholder: string = '';
  @Input() hasButton: boolean = true;
  @Input() autocompleteFn!: (query: string, isActive: boolean) => Observable<any[]>;
  @Input() activeStatus: boolean = true;
  @Input() form!: FormGroup;
  @Input() label: string = '';
  @Input() name: string = '';

  @Output() searchChange = new EventEmitter<string>();
  suggestions: string[] = [];
  showSuggestions: boolean = false;
  isSelectingSuggestion = false;

  ngOnInit() {
    this.setupAutoComplete();
  }

  private setupAutoComplete() {
    if (!this.autocompleteFn) return;

    this.form
      .get(this.name)!
      .valueChanges.pipe(
        filter(() => !this.isSelectingSuggestion),
        debounceTime(300),
        distinctUntilChanged(),
        filter((v) => v && v.trim().length > 0),
        switchMap((value) => this.autocompleteFn(value, this.activeStatus)),
      )
      .subscribe((results) => {
        this.suggestions = results;
        this.showSuggestions = true;
      });
  }

  onSearch() {
    const value = this.form.value.search?.trim();
    this.showSuggestions = false;
    this.searchChange.emit(value);
  }

  selectSuggestion(item: string) {
    this.isSelectingSuggestion = true;

    this.form.patchValue({ search: item }, { emitEvent: false });

    this.showSuggestions = false;
    this.searchChange.emit(item);

    setTimeout(() => {
      this.isSelectingSuggestion = false;
    }, 200);
  }

  focus() {
    this.child.focus();
  }

  onFocus() {
    if (this.suggestions.length > 0) {
      this.showSuggestions = true;
    }
  }

  onBlur() {
    setTimeout(() => {
      this.showSuggestions = false;
    }, 200);
  }

  formatCapitalize(text: string) {
    return Formatter.capitalize(text);
  }
}
