export interface StackIcon {
  name: string;
  url: string;
  rank: number;
}

export interface StackIconsDoc {
  icons: StackIcon[];
}

export interface CategoryDoc {
  categories: string[];
}

export interface UrlDoc {
  urls: ProjectUrl[];
}

export interface ProjectUrl {
  title: string;
  description: string;
  image: string;
  liveUrl: string;
  sourceUrl: string;
  category: string;
}

export interface AssetsDoc {
  bio: string;
  profileImage: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  liveUrl: string;
  sourceUrl: string;
  category: string;
}

export interface ContactFormData {
  name: string;
  company?: string;
  email: string;
  message: string;
}
