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

  const metaTitle = post.seoMeta?.metaTitle || `${post.title} - Beautcia Blog`;
  const metaDesc = post.seoMeta?.metaDescription || post.summary;

  return {
    title: metaTitle,
    description: metaDesc,
    alternates: {
      canonical: post.seoMeta?.canonicalUrl || `/blog/${slug}`,
    },
    openGraph: {
      title: post.seoMeta?.ogTitle || `${post.title} - Beautcia Blog`,
      description: post.seoMeta?.ogDescription || post.summary,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [{ url: post.seoMeta?.ogImage || post.image, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: post.seoMeta?.twitterCard || "summary_large_image",
      title: post.seoMeta?.ogTitle || `${post.title} - Beautcia Blog`,
      description: post.seoMeta?.ogDescription || post.summary,
      images: [post.seoMeta?.ogImage || post.image],
    },
    robots: post.seoMeta?.noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

function RenderBlock({ block }: { block: any }) {
  switch (block.type) {
    case 'heading': {
      const Tag = `h${block.content.level || 2}` as any;
      return (
        <Tag key={block.id} id={`h-${block.id}`} className={`font-bold text-gray-900 mt-8 mb-4 ${block.meta?.alignment === 'center' ? 'text-center' : block.meta?.alignment === 'right' ? 'text-right' : 'text-left'}`} style={{ fontSize: block.meta?.fontSize === 'xl' ? '1.875rem' : block.meta?.fontSize === '2xl' ? '2.25rem' : block.meta?.fontSize === 'sm' ? '0.875rem' : '1.5rem', color: block.meta?.color }}>
          {block.content.text}
        </Tag>
      );
    }
    case 'paragraph':
      return (
        <p key={block.id} className={`mb-6 text-gray-700 leading-relaxed ${block.meta?.alignment === 'center' ? 'text-center' : block.meta?.alignment === 'right' ? 'text-right' : 'text-left'}`} style={{ fontSize: block.meta?.fontSize === 'lg' ? '1.125rem' : block.meta?.fontSize === 'sm' ? '0.875rem' : '1rem', color: block.meta?.color }}>
          {block.content.text}
        </p>
      );
    case 'image':
      return (
        <figure key={block.id} className={`my-8 ${block.content.alignment === 'center' ? 'text-center' : ''}`} style={{ maxWidth: block.content.width === '50%' ? '50%' : block.content.width === '25%' ? '25%' : block.content.width === '75%' ? '75%' : '100%' }}>
          <img src={block.content.src} alt={block.content.altText || ''} className="rounded-lg shadow-lg" loading="lazy" />
          {block.content.caption && <figcaption className="mt-2 text-center text-sm text-gray-500 italic">{block.content.caption}</figcaption>}
        </figure>
      );
    case 'video':
      return (
        <div key={block.id} className="my-8 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
          {block.content.src.includes('youtube') ? (
            <iframe className="w-full h-[300px]" src={block.content.src.replace('/watch?v=', '/embed/')} title="Video" frameBorder="0" allowFullScreen loading="lazy" />
          ) : (
            <video className="w-full h-[300px] object-cover" poster={block.content.poster || undefined} controls preload="metadata">
              <source src={block.content.src} type="video/mp4" />
            </video>
          )}
        </div>
      );
    case 'audio':
      return (
        <div key={block.id} className="my-8 rounded-lg border border-gray-200 bg-gray-50 p-4">
          <audio className="w-full" controls preload="metadata" src={block.content.src} />
          {block.content.transcript && (
            <div className="mt-4"><p className="text-sm font-semibold text-gray-900 mb-2">Transcript</p><p className="text-sm text-gray-600">{block.content.transcript}</p></div>
          )}
        </div>
      );
    case 'button':
      return (
        <div key={block.id} className={`my-8 flex justify-${block.content.alignment || 'center'}`}>
          <a href={block.content.url || '#'} className={`px-6 py-3 rounded-lg text-white font-medium transition-colors ${block.content.style === 'primary' ? 'bg-gradient-to-r from-[#B28B53] to-[#9A7540]' : block.content.style === 'secondary' ? 'bg-gray-700' : 'border-2 border-[#B28B53] text-[#B28B53] bg-transparent'}`}>{block.content.text}</a>
        </div>
      );
    case 'blockquote':
      return (
        <blockquote key={block.id} className="my-8 p-6 rounded-lg border-l-4 border-[#B28B53] bg-gray-50 italic text-gray-700">
          <p className="text-lg">{block.content.text}</p>
          {block.content.attribution && <p className="mt-4 text-right text-sm font-semibold text-gray-500">— {block.content.attribution}</p>}
        </blockquote>
      );
    case 'callout':
      return (
        <div key={block.id} className="my-8 p-4 rounded-lg border-l-4" style={{ borderColor: block.content.type === 'info' ? '#3b82f6' : block.content.type === 'warning' ? '#f59e0b' : block.content.type === 'error' ? '#ef4444' : '#10b981', backgroundColor: block.content.type === 'info' ? '#eff6ff' : block.content.type === 'warning' ? '#fffbeb' : block.content.type === 'error' ? '#fef2f2' : '#dcfce7' }}>
          <span className="font-bold mr-2">{block.content.type === 'info' ? 'ℹ️' : block.content.type === 'warning' ? '⚠️' : block.content.type === 'error' ? '❌' : '✅'}</span>
          {block.content.text}
        </div>
      );
    case 'faq':
      return (
        <div key={block.id} className="my-8 rounded-lg border border-gray-200 bg-gray-50 p-6">
          <div className="flex items-start gap-2 mb-2"><span className="text-[#B28B53] font-bold text-sm">Q:</span><p className="text-gray-900">{block.content.question}</p></div>
          <div className="flex items-start gap-2"><span className="text-gray-600 font-bold text-sm">A:</span><p className="text-gray-700">{block.content.answer}</p></div>
        </div>
      );
    case 'divider':
      return <hr key={block.id} className="my-8 border-0 border-t border-gray-200" />;
    case 'spacer':
      return <div key={block.id} className="my-4" style={{ height: block.content.height || '2rem' }} />;
    case 'backlink':
      return (
        <div key={block.id} className="my-8">
          <a href={block.content.url || '#'} className="text-[#B28B53] hover:underline font-medium" rel={block.content.rel === 'dofollow' ? undefined : block.content.rel}>{block.content.text || block.content.url}</a>
        </div>
      );
    case 'embed':
      return (
        <div key={block.id} className="my-8 rounded-lg overflow-hidden border border-gray-200 max-w-md mx-auto">
          <iframe className="w-full h-[300px]" src={block.content.url} title="Embed" frameBorder="0" loading="lazy" />
        </div>
      );
    default:
      return null;
  }
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

  const faqBlocks = post.blocks?.filter((b: any) => b.type === 'faq') || [];

  return (
    <>
      <JsonLd data={[
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
        ...(faqBlocks.length > 0 ? [{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqBlocks.map((b: any) => ({
            "@type": "Question",
            name: b.content.question,
            acceptedAnswer: { "@type": "Answer", text: b.content.answer },
          })),
        }] : [])
      ]} />
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

          {post.image && (
            <div className="mb-10 h-64 w-full overflow-hidden rounded-2xl bg-gray-100 md:h-96">
              <img src={post.image} alt={post.title} className="h-full w-full object-cover" loading="lazy" />
            </div>
          )}

          <div className="space-y-5 text-gray-700 leading-relaxed">
            {post.blocks && post.blocks.length > 0 ? (
              post.blocks.map((block: any) => <RenderBlock key={block.id} block={block} />)
            ) : (
              post.content.map((paragraph, i) => <p key={i}>{paragraph}</p>)
            )}
          </div>
        </article>

        {relatedPosts.length > 0 && (
          <section className="border-t border-gray-200 bg-gray-50">
            <div className="mx-auto max-w-6xl px-6 py-16">
              <h2 className="mb-8 text-2xl font-black text-gray-900">More Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((related) => (
                  <Link key={related.id} href={`/blog/${related.slug}`} className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300">
                    <div className="relative h-40 w-full overflow-hidden bg-gray-100">
                      <img src={related.image} alt={related.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">{related.date}</div>
                      <h3 className="mb-2 text-lg font-bold text-gray-900 group-hover:text-secondary transition-colors">{related.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{related.summary}</p>
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
