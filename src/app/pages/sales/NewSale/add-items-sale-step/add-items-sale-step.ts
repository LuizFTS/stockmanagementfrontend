import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Button } from '../../../../shared/components/button/button';
import { BackButton } from '../../../../shared/components/back-button/back-button';
import { TextInput } from '../../../../shared/components/text-input/text-input';
import { SearchInput } from '../../../../shared/components/search-input/search-input';
import { MatIcon } from '@angular/material/icon';
import type { FormArray, FormGroup } from '@angular/forms';
import { ProductService } from '../../../../core/services/api/product.service';
import { Formatter } from '../../../../shared/utils/Formatter';
import type { SaleItem } from '../new-sale-page/new-sale-page';
import { ResponseMessageService } from '../../../../core/services/response-message.service';

@Component({
  selector: 'stk-add-items-sale-step',
  imports: [Button, BackButton, TextInput, MatIcon, SearchInput],
  templateUrl: './add-items-sale-step.html',
  styleUrl: './add-items-sale-step.scss',
})
export class AddItemsSaleStep {
  private _itens: SaleItem[] = [];

  @ViewChild(SearchInput) child!: SearchInput;
  @Input() form!: FormGroup;
  @Input() formParent!: FormGroup;
  @Input() isLoading: boolean = false;

  @Output() back = new EventEmitter<void>();
  @Output() addItem = new EventEmitter<any>();
  @Output() removeItem = new EventEmitter<number>();

  addItemLoading: boolean = false;

  constructor(
    public productService: ProductService,
    private responseMessageService: ResponseMessageService,
  ) {}

  ngOnInit() {
    const formArray = this.formParent.get('itens') as FormArray;
    this._itens = formArray.value;

    formArray.valueChanges.subscribe((value) => {
      this._itens = value;
    });
  }

  onSearchProduct(term: string) {
    this.form.patchValue({
      name: term,
    });
  }

  onBack() {
    this.back.emit();
  }

  onAddItem() {
    if (this.isInvalid) return;
    this.addItemLoading = true;
    this.getProductByName();
  }

  onRemoveItem(index: number) {
    this.removeItem.emit(index);
  }

  get isInvalid() {
    if (this.form.get('name')?.invalid || this.form.get('quantity')?.invalid) {
      return true;
    }
    return false;
  }

  get itens() {
    return this._itens;
  }

  get total() {
    return this.itens.reduce((total: any, item: any) => total + item.price * item.quantity, 0);
  }

  formatPrice(value: number) {
    return Formatter.priceToString(value) ?? 0;
  }

  capitalize(value: string) {
    return Formatter.capitalize(value) ?? '';
  }

  onEnter(event: KeyboardEvent) {
    if (this.isInvalid) return;
    if (event.key !== 'Enter') return;
    event.preventDefault();
    this.onAddItem();
  }

  private getProductByName() {
    const productName = this.form.get('name')?.value.toLowerCase().trim();
    const quantity = parseInt(this.form.get('quantity')?.value);

    this.productService.get(0, 1, true, { name: productName }).subscribe({
      next: ({ content }) => {
        if (content.length === 0) {
          this.responseMessageService.error('Produto não encontrado');
          this.addItemLoading = false;
          return;
        }

        if (this._itens.find((item: any) => item.id === content[0].id)) {
          this.responseMessageService.error('Produto já adicionado');
          this.addItemLoading = false;
          return;
        }

        if (content[0].inventoryBalance < quantity) {
          this.responseMessageService.error('Quantidade insuficiente em estoque');
          this.addItemLoading = false;
          return;
        }

        this.form.patchValue({
          id: content[0].id,
          price: content[0].costPrice,
          name: content[0].name,
        });

        this.addItem.emit({ ...this.form.value });

        this.form.reset();

        this.child.focus();
        this.addItemLoading = false;
      },
      error: (err) => {
        this.responseMessageService.error(err.error.message);
        this.addItemLoading = false;
      },
    });
  }
}
