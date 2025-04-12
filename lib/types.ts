export interface Testimonial {
  id: number;
  name: string;
  email: string;
  review: string;
}

export interface Project {
  id: number;
  image: string;
  location: string;
  company: string;
  title: string;
  description: string;
  features: string[];
  link: string;
}
