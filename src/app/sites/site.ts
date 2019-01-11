export interface Site {
  id: number;
  name: string;
  category: string;
  location: string;
  shortDescription: string;
  description: string;
  price: number;
  starRating: number;
  facilities?: string[];
  imageUrl: string;
}
