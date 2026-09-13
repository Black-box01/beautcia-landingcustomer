import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components";
import { fetchBlogPosts } from "@/lib/cms";
import { JsonLd } from "@/lib/seo/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/seo/schemas";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog - Beautcia",
  description:
    "Beauty tips, self-care guides, and industry insights for clients. Discover how to find, book, and enjoy premium beauty services with Beautcia.",
  alternates: {
    canonical: "/blog",
  },
};

export default async function BlogPage() {
  const posts = await fetchBlogPosts();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Blog", url: "/blog" },
          ]),
          ...posts.map((post) =>
            articleSchema({
              title: post.title,
              summary: post.summary,
              image: post.image,
              author: post.author,
              date: post.date,
              slug: post.slug,
            })
          ),
        ]}
      />
      <main className="flex-1 w-full bg-white">
        {/* Header */}
        <header className="w-full border-b border-gray-200 bg-gradient-to-b from-white to-gray-50">
          <div className="mx-auto max-w-6xl px-6 py-16 text-center">
            <Link
              href="/"
              className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-secondary transition-colors"
            >
              <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12H5m0 0l6.75 6.75M5 12l6.75-6.75" />
              </svg>
              Back to Home
            </Link>
            <p className="text-sm font-bold uppercase tracking-widest text-secondary mb-3">
              Our Blog
            </p>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Beauty Tips &amp; Self-Care Guides
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Inspiration and practical advice to help you look and feel your
              best, every day.
            </p>
          </div>
        </header>

        {/* Posts */}
        <section className="mx-auto max-w-6xl px-6 py-16">
          {posts.length === 0 ? (
            <p className="text-center text-gray-500 py-20">
              No articles published yet. Check back soon.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
                      {post.date}
                    </div>
                    <h2 className="mb-2 text-xl font-bold text-gray-900 group-hover:text-secondary transition-colors">
                      {post.title}
                    </h2>
                    <p className="mb-4 flex-1 text-sm text-gray-600 leading-relaxed">
                      {post.summary}
                    </p>
                    <span className="text-sm font-semibold text-secondary">
                      Read more &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
