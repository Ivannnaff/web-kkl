export interface Photo {
  src: string;
  alt: string;
  caption?: string;
}

export interface Day {
  id: string;
  day: number;
  date: string;
  title: string;
  location: string;
  category: string;
  description: string;
  quote: string;
  learnings: string[];
  favoriteMoment?: { by: string; text: string };
  photos: Photo[];
}

export interface Member {
  nickname: string;
  fullName: string;
  class: string;
  seat: string;
  role?: string;
  quote?: string;
  photo?: string;
}
