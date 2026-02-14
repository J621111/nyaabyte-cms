export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  content: string;
  image?: string;
  tags?: string[];
}

export interface PostFrontmatter {
  title: string;
  date: string;
  description: string;
  image?: string;
  tags?: string[];
}

export interface CreatePostInput {
  slug: string;
  title: string;
  description: string;
  content: string;
  image?: string;
  tags?: string[];
}

export interface UpdatePostInput extends Partial<CreatePostInput> {
  slug: string;
}
