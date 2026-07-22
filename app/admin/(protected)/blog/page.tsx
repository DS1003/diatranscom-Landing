import { getPosts } from "@/actions/blog-actions";
import { BlogClient } from "@/components/admin/blog-client";

export default async function BlogPage() {
  const posts = await getPosts();

  return <BlogClient posts={posts} />;
}
