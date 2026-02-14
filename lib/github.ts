import { Octokit } from '@octokit/rest';
import matter from 'gray-matter';
import { Post, PostFrontmatter, CreatePostInput } from '@/types/post';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN!;
const GITHUB_OWNER = process.env.GITHUB_OWNER || 'J621111';
const GITHUB_REPO = process.env.GITHUB_REPO || 'NyaaByte-Blog';
const CONTENT_PATH = process.env.GITHUB_CONTENT_PATH || 'content';

const octokit = new Octokit({
  auth: GITHUB_TOKEN,
});

function encodeContent(content: string): string {
  return Buffer.from(content).toString('base64');
}

function decodeContent(content: string): string {
  return Buffer.from(content, 'base64').toString('utf-8');
}

function generateFrontmatter(frontmatter: PostFrontmatter): string {
  const lines = ['---'];
  
  if (frontmatter.title) lines.push(`title: ${frontmatter.title}`);
  if (frontmatter.date) lines.push(`date: ${frontmatter.date}`);
  if (frontmatter.description) lines.push(`description: ${frontmatter.description}`);
  if (frontmatter.image) lines.push(`image: ${frontmatter.image}`);
  if (frontmatter.tags && frontmatter.tags.length > 0) {
    lines.push(`tags:`);
    frontmatter.tags.forEach(tag => lines.push(`  - ${tag}`));
  }
  
  lines.push('---');
  return lines.join('\n');
}

function parseFrontmatter(content: string): { data: PostFrontmatter; content: string } {
  const parsed = matter(content);
  return {
    data: parsed.data as PostFrontmatter,
    content: parsed.content,
  };
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    const { data: files } = await octokit.repos.getContent({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      path: CONTENT_PATH,
    });

    if (!Array.isArray(files)) {
      return [];
    }

    const mdxFiles = files.filter(file => file.name.endsWith('.mdx'));
    
    const posts = await Promise.all(
      mdxFiles.map(async (file) => {
        try {
          const { data } = await octokit.repos.getContent({
            owner: GITHUB_OWNER,
            repo: GITHUB_REPO,
            path: `${CONTENT_PATH}/${file.name}`,
          });

          if ('content' in data) {
            const content = decodeContent(data.content);
            const { data: frontmatter, content: body } = parseFrontmatter(content);
            
            return {
              slug: file.name.replace(/\.mdx$/, ''),
              title: frontmatter.title || 'Untitled',
              date: frontmatter.date || new Date().toISOString(),
              description: frontmatter.description || '',
              content: body,
              image: frontmatter.image,
              tags: frontmatter.tags || [],
            };
          }
          return null;
        } catch (error) {
          console.error(`Error fetching post ${file.name}:`, error);
          return null;
        }
      })
    );

    return posts
      .filter((post): post is Post => post !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const { data } = await octokit.repos.getContent({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      path: `${CONTENT_PATH}/${slug}.mdx`,
    });

    if ('content' in data) {
      const content = decodeContent(data.content);
      const { data: frontmatter, content: body } = parseFrontmatter(content);
      
      return {
        slug,
        title: frontmatter.title || 'Untitled',
        date: frontmatter.date || new Date().toISOString(),
        description: frontmatter.description || '',
        content: body,
        image: frontmatter.image,
        tags: frontmatter.tags || [],
      };
    }
    
    return null;
  } catch (error) {
    console.error(`Error fetching post ${slug}:`, error);
    return null;
  }
}

export async function createPost(input: CreatePostInput): Promise<void> {
  const frontmatter: PostFrontmatter = {
    title: input.title,
    date: input.date || new Date().toISOString(),
    description: input.description,
    image: input.image,
    tags: input.tags,
  };

  const content = `${generateFrontmatter(frontmatter)}\n\n${input.content}`;

  await octokit.repos.createOrUpdateFileContents({
    owner: GITHUB_OWNER,
    repo: GITHUB_REPO,
    path: `${CONTENT_PATH}/${input.slug}.mdx`,
    message: `Create post: ${input.title}`,
    content: encodeContent(content),
  });
}

export async function updatePost(slug: string, input: Partial<CreatePostInput>): Promise<void> {
  // Get existing post to preserve unchanged fields
  const existing = await getPostBySlug(slug);
  if (!existing) {
    throw new Error(`Post ${slug} not found`);
  }

  const frontmatter: PostFrontmatter = {
    title: input.title ?? existing.title,
    date: input.date ?? existing.date,
    description: input.description ?? existing.description,
    image: input.image ?? existing.image,
    tags: input.tags ?? existing.tags,
  };

  const content = `${generateFrontmatter(frontmatter)}\n\n${input.content ?? existing.content}`;

  // Get the SHA of the existing file
  const { data } = await octokit.repos.getContent({
    owner: GITHUB_OWNER,
    repo: GITHUB_REPO,
    path: `${CONTENT_PATH}/${slug}.mdx`,
  });

  if ('sha' in data) {
    await octokit.repos.createOrUpdateFileContents({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      path: `${CONTENT_PATH}/${slug}.mdx`,
      message: `Update post: ${frontmatter.title}`,
      content: encodeContent(content),
      sha: data.sha,
    });
  }
}

export async function deletePost(slug: string): Promise<void> {
  const { data } = await octokit.repos.getContent({
    owner: GITHUB_OWNER,
    repo: GITHUB_REPO,
    path: `${CONTENT_PATH}/${slug}.mdx`,
  });

  if ('sha' in data) {
    await octokit.repos.deleteFile({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      path: `${CONTENT_PATH}/${slug}.mdx`,
      message: `Delete post: ${slug}`,
      sha: data.sha,
    });
  }
}

export async function uploadImage(fileName: string, content: Buffer): Promise<string> {
  const path = `public/images/${Date.now()}-${fileName}`;
  
  await octokit.repos.createOrUpdateFileContents({
    owner: GITHUB_OWNER,
    repo: GITHUB_REPO,
    path,
    message: `Upload image: ${fileName}`,
    content: content.toString('base64'),
  });

  return `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/main/${path}`;
}
