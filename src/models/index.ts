export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role?: string | null;
  avatar?: string | null;
  orders: Order[];
  reviews: Review[];
  shoppingCarts: ShoppingCart[];
  payments: Payment[];
  shippingAddresses: ShippingAddress[];
  wishlists: Wishlist[];
  Shipment: Shipment[];
  directMessages: DirectMessage[];
  conversationsInitiated: Conversation[];
  conversationsReceived: Conversation[];
  SeeenMessage: SeenMessage[];
}

export interface Product {
  id: number;
  description: string;
  price: number;
  sale?: number | null;
  thumbnail?: string | null;
  images?: string | null;
  categoryId?: number | null;
  typeId?: number | null;
  genderId?: number | null;
  name: string;
  sizes: string;
  category?: Category | null;
  type?: ProductType | null;
  gender?: Gender | null;
  reviews: Review[];
  orderItems: OrderItem[];
  sales: Sale[];
  wishlists: Wishlist[];
  CartItem: CartItem[];
}

export interface Category {
  id: number;
  name: string;
  products: Product[];
}

export interface ProductType {
  id: number;
  name: string;
  products: Product[];
  Subcategory: Subcategory[];
}

export interface Subcategory {
  id: number;
  name: string;
  productTypeId: number;
  productType: ProductType;
}

export interface Gender {
  id: number;
  name: string;
  products: Product[];
}

export interface ProductSize {
  id: number;
  size: string;
  remaining: number;
}

export interface Review {
  id: number;
  text: string;
  rating: number;
  userId: number;
  productId: number;
  user: User;
  product: Product;
}

export interface Sale {
  id: number;
  startDate: Date;
  endDate: Date;
  products: Product[];
}

export interface Order {
  id: number;
  orderDate: Date;
  total: number;
  userId: number;
  user: User;
  orderItems: OrderItem[];
  shipment: Shipment[];
}

export interface OrderItem {
  id: number;
  quantity: number;
  productId: number;
  orderId: number;
  product: Product;
  order: Order;
}

export interface ShoppingCart {
  id: number;
  userId: number;
  user: User;
  cartItems: CartItem[];
}

export interface CartItem {
  id: number;
  quantity: number;
  productId: number;
  shoppingCartId: number;
  product: Product;
  shoppingCart: ShoppingCart;
}

export interface Payment {
  id: number;
  paymentMethod: string;
  amount: number;
  paymentDate: Date;
  userId: number;
  user: User;
}

export interface ShippingAddress {
  id: number;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  userId: number;
  user: User;
  shipments: Shipment[];
}

export interface ShippingMethod {
  id: number;
  name: string;
  estimatedDeliveryTime: string;
  shipments: Shipment[];
}

export interface Shipment {
  id: number;
  trackingCode: string;
  shipDate: Date;
  estimatedDeliveryDate: Date;
  userId: number;
  orderId: number;
  shippingMethodId: number;
  shippingAddressId: number;
  user: User;
  order: Order;
  shippingMethod: ShippingMethod;
  shippingAddress: ShippingAddress;
}

export interface Promotion {
  id: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  discount: number;
  couponCodes: CouponCode[];
}

export interface CouponCode {
  id: number;
  code: string;
  discount: number;
  expirationDate: Date;
  promotionId: number;
  promotion: Promotion;
}

export interface Wishlist {
  id: number;
  userId: number;
  user: User;
  products: Product[];
}

export interface Conversation {
  id: string;
  userOneId: number;
  userTwoId: number;
  lastMessageAt: Date;
  userOne: User;
  userTwo: User;
  directMessages: DirectMessage[];
}

export interface DirectMessage {
  id: string;
  content: string;
  fileUrl?: string | null;
  userId: number;
  conversationId: string;
  deleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  conversation: Conversation;
  SeeenMessage: SeenMessage[];
}

export interface SeenMessage {
  id: string;
  userId: number;
  directMessageId: string;
  user: User;
  directMessage: DirectMessage;
}

export interface ProductToSale {
  A: number;
  B: number;
}

export interface ProductToWishlist {
  A: number;
  B: number;
}

export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
}
