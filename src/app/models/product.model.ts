export interface ProductModel {
  id: number;
  name: string;
  description: string;
  currentPrice: number;
  promotion: number;
  available: boolean;
  selected: boolean;
  quantity: number;

  _links: {
    self: { href: string },
    product: { href: string },
    category: { href: string }
  }
}
