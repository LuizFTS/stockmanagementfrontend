export class Formatter {
  static capitalize(str: string): string {
    return str.toLowerCase().replace(/(?:^|\s)\p{L}/gu, (match) => match.toUpperCase());
  }

  static date(date: string): string {
    return new Date(date).toLocaleDateString('pt-BR');
  }

  static priceToString(price: number): string {
    return price.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  static priceToNumber(price: string): number {
    if (price === null || price === undefined) return 0;

    const str = String(price).replace(',', '.').replace('.', '');

    return parseFloat(str);
  }

  static phone(phone: string): string {
    return phone.replace(/^(\d{2})(\d)/, '($1) $2').replace(/(\d)(\d{4})(\d{4})$/, '$1-$2-$3');
  }

  static taxId(taxId: string): string {
    if (taxId.length === 14) {
      return taxId.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    } else {
      return taxId.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
  }
}
