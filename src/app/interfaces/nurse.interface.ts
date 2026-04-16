export interface Nurse {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  distance: string;
  price: number;
  available: boolean;
  experience: number;

  // imágenes
  profileImage: string;
  coverImage: string;
}