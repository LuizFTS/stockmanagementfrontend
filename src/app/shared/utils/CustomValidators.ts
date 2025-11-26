import type { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
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

  static cpfOrCnpj(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;
      }

      const cleanValue = value.replace(/\D+/g, '');

      const isCpf = cleanValue.length === 11;
      const isCnpj = cleanValue.length === 14;

      if (!isCpf && !isCnpj) {
        return { cpfOrCnpjInvalid: true };
      }

      return null;
    };
  }

  static quantity(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const rawValue = control.value;
      if (rawValue === null || rawValue === undefined || rawValue === '') {
        return null;
      }
      const quantity = Number(rawValue);

      if (!Number.isInteger(quantity)) {
        return { quantityInvalid: true };
      }

      if (quantity < 1) {
        return { quantityInvalid: true };
      }

      return null;
    };
  }

  static price(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const rawValue = control.value;
      if (rawValue === null || rawValue === undefined || rawValue === '') {
        return null;
      }
      const price = Number(rawValue);

      if (price <= 0) {
        return { priceInvalid: true };
      }

      return null;
    };
  }

  static passwordsMatchValidator(): ValidatorFn {
    return (control: AbstractControl) => {
      const pass = control.get('newPassword')?.value;
      const confirm = control.get('confirmPassword')?.value;
      return pass === confirm ? null : { passwordsNotMatching: true };
    };
  }

  static periodValidator(): ValidatorFn {
    return (form: AbstractControl) => {
      const startPeriod = parseInt(form.get('startPeriod')?.value);
      const endPeriod = parseInt(form.get('endPeriod')?.value);
      return startPeriod <= endPeriod ? null : { periodNotValid: true };
    };
  }
}
