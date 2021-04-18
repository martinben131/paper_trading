export interface Stock {
  name: string;
  code: string;
  price: number;
  change: number;
}

export interface OwnedStock {
  stock: Stock;
  quantity: number;
}
