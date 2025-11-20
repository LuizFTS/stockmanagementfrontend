import type { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CnpjValidator {
  static cnpj(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const cnpj = control.value;
      if (!cnpj) {
        return null;
      }

      const cleanCnpj = cnpj.replace(/\D+/g, '');

      if (cleanCnpj.length !== 14) {
        return { cnpjInvalid: true };
      }

      if (/^(\d)\1{13}$/.test(cleanCnpj)) {
        return { cnpjInvalid: true };
      }

      return null;
    };
  }
}
