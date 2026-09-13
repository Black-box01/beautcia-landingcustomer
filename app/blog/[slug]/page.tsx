import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components";
import { fetchBlogPostBySlug, fetchBlogPosts } from "@/lib/cms";
import { JsonLd } from "@/lib/seo/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/seo/schemas";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchBlogPostBySlug(slug);
  if (!post) return { title: "Blog Not Found - Beautcia" };
  return {
    title: `${post.title} - Beautcia Blog`,
    description: post.summary,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title: `${post.title} - Beautcia Blog`,
      description: post.summary,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: post.image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} - Beautcia Blog`,
      description: post.summary,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await fetchBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const allPosts = await fetchBlogPosts();
  const relatedPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            title: post.title,
            summary: post.summary,
            image: post.image,
            author: post.author,
            date: post.date,
            slug,
          }),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Blog", url: "/blog" },
            { name: post.title, url: `/blog/${slug}` },
          ]),
        ]}
      />
      <main className="flex-1 w-full bg-white">
        <article className="mx-auto max-w-3xl px-6 py-16">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-secondary transition-colors"
          >
            <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12H5m0 0l6.75 6.75M5 12l6.75-6.75" />
            </svg>
            Back to Blog
          </Link>

          <div className="mb-4 flex items-center gap-3 text-sm text-gray-500">
            <span className="font-semibold text-secondary">{post.date}</span>
            <span aria-hidden="true">&bull;</span>
            <span>By {post.author}</span>
          </div>

          <h1 className="mb-4 text-4xl md:text-5xl font-black text-gray-900 leading-tight">
            {post.title}
          </h1>

          <p className="mb-8 text-lg text-gray-600 leading-relaxed">
            {post.summary}
          </p>

          <div className="mb-10 h-64 w-full overflow-hidden rounded-2xl bg-gray-100 md:h-96">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.image}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="space-y-5 text-gray-700 leading-relaxed">
            {post.content.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </article>

        {relatedPosts.length > 0 && (
          <section className="border-t border-gray-200 bg-gray-50">
            <div className="mx-auto max-w-6xl px-6 py-16">
              <h2 className="mb-8 text-2xl font-black text-gray-900">
                More Articles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.id}
                    href={`/blog/${related.slug}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative h-40 w-full overflow-hidden bg-gray-100">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={related.image}
                        alt={related.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                        {related.date}
                      </div>
                      <h3 className="mb-2 text-lg font-bold text-gray-900 group-hover:text-secondary transition-colors">
                        {related.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {related.summary}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
