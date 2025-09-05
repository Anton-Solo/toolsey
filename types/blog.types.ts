export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  summary: string | null;
  content: string;
  images: {
    large: string;
    medium: string;
  };
  categories: string[];
  published: string;
}

export interface BlogApiResponse {
  data: BlogPost[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: Array<{
      url: string | null;
      label: string;
      active: boolean;
    }>;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

export interface BlogApiParams {
  page?: number;
  perPage?: number;
  category?: string;
  sort?: string;
  searchText?: string;
}
