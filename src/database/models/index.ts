
export type restaurantItem = {
  id: number;
  name: string;
  rating: string;
  priceDelivery: string;
  priceDeliveryUsual: string;
  menuDiscount: string;
  image: string;
};

export type foodItem = {
  id: number; 
  restaurantId: number;
  categoryId: number;
  name: string;
  price: number;
  description: string;
  discount: number;
  image: string;
  popular: number;
  available: number;
}
