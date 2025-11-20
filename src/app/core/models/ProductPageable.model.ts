import { Product } from './Product.model';

interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

interface Pageable {
  offset: number;
  pageSize: number;
  pageNumber: number;
  paged: boolean;
  sort: Sort;
  unpaged: boolean;
}

export interface ProductPageable {
  content: Product[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: Pageable;
  size: number;
  sort: Sort;
  totalElements: number;
  totalPages: number;
}
