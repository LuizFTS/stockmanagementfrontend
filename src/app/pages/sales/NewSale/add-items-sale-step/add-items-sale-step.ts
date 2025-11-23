import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Button } from '../../../../shared/components/button/button';
import { BackButton } from '../../../../shared/components/back-button/back-button';
import { TextInput } from '../../../../shared/components/text-input/text-input';
import { MatIcon } from '@angular/material/icon';
import type { FormArray, FormGroup } from '@angular/forms';
import { ProductService } from '../../../../core/services/product.service';
import { Formatter } from '../../../../shared/utils/Formatter';

@Component({
  selector: 'stk-add-items-sale-step',
  imports: [Button, BackButton, TextInput, MatIcon],
  templateUrl: './add-items-sale-step.html',
  styleUrl: './add-items-sale-step.scss',
})
export class AddItemsSaleStep {
  private _itens: any[] = [];

  @ViewChild('productName') productName!: any;
  @Input() form!: FormGroup;
  @Input() formParent!: FormGroup;
  @Input() isLoading: boolean = false;

  @Output() back = new EventEmitter<void>();
  @Output() showMessage = new EventEmitter<{ message: string; status: string }>();
  @Output() addItem = new EventEmitter<any>();
  @Output() removeItem = new EventEmitter<number>();

  addItemLoading: boolean = false;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    const formArray = this.formParent.get('itens') as FormArray;
    this._itens = formArray.value;

    formArray.valueChanges.subscribe((value) => {
      this._itens = value;
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

    this.productService.get(0, 1, { name: productName }).subscribe({
      next: ({ content }) => {
        if (content.length === 0) {
          this.showMessage.emit({ message: 'Produto não encontrado', status: 'error' });
          this.addItemLoading = false;
          return;
        }

        if (this._itens.find((item: any) => item.id === content[0].id)) {
          this.showMessage.emit({ message: 'Produto já adicionado', status: 'error' });
          this.addItemLoading = false;
          return;
        }

        if (content[0].inventoryBalance < quantity) {
          this.showMessage.emit({ message: 'Quantidade insuficiente em estoque', status: 'error' });
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

        this.productName.focus();
        this.addItemLoading = false;
      },
      error: (err) => {
        this.showMessage.emit({ message: err.error.message, status: 'error' });
        this.addItemLoading = false;
      },
    });
  }
}
