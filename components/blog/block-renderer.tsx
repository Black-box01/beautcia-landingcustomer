'use client';

import Image from 'next/image';
import Link from 'next/link';
import { JsonLd } from '@/lib/seo/JsonLd';
import { faqPageSchema, howToSchema } from '@/lib/seo/schemas';

interface BlockRendererProps {
  blocks: any[];
  seoMeta?: any;
}

export function BlogBlockRenderer({ blocks, seoMeta }: BlockRendererProps) {
  const faqBlocks = blocks.filter((b: any) => b.type === 'faq');
  const howToBlocks = blocks.filter((b: any) => b.type === 'embed' || b.content?.schemaType === 'HowTo');
  const headingBlocks = blocks.filter((b: any) => b.type === 'heading');

  return (
    <article className="prose prose-lg max-w-none">
      {faqBlocks.length > 0 && (
        <JsonLd data={faqPageSchema(faqBlocks.map((b: any) => ({ question: b.content.question, answer: b.content.answer })))}}
      )}
      {howToBlocks.length > 0 && (
        <JsonLd data={howToSchema(howToBlocks.map((b: any) => ({ title: b.content.text || 'Step', description: b.content.text || '' })))}}
      )}

      {blocks.map((block, index) => {
        switch (block.type) {
          case 'heading': {
            const LevelTag = `h${block.content.level || 2}` as any;
            const headingId = `heading-${index}`;
            return (
              <LevelTag
                key={index}
                id={headingId}
                className={`font-bold text-gray-900 mt-8 mb-4 ${block.meta?.alignment === 'center' ? 'text-center' : block.meta?.alignment === 'right' ? 'text-right' : 'text-left'}`}
                style={{
                  fontSize: block.meta?.fontSize === 'xl' ? '1.875rem' : block.meta?.fontSize === '2xl' ? '2.25rem' : block.meta?.fontSize === 'sm' ? '0.875rem' : '1.5rem',
                  color: block.meta?.color || undefined,
                }}
              >
                {block.content.text}
              </LevelTag>
            );
          }
          case 'paragraph':
            return (
              <p
                key={index}
                className={`mb-6 text-gray-700 leading-relaxed ${block.meta?.alignment === 'center' ? 'text-center' : block.meta?.alignment === 'right' ? 'text-right' : 'text-left'}`}
                style={{ fontSize: block.meta?.fontSize === 'lg' ? '1.125rem' : block.meta?.fontSize === 'sm' ? '0.875rem' : '1rem', color: block.meta?.color || undefined }}
              >
                {block.content.text}
              </p>
            );
          case 'image':
            return (
              <figure key={index} className={`my-8 ${block.content.alignment === 'center' ? 'text-center' : block.content.alignment === 'left' ? 'float-left mr-4' : 'float-right ml-4'}`} style={{ maxWidth: block.content.width === '50%' ? '50%' : block.content.width === '25%' ? '25%' : block.content.width === '75%' ? '75%' : '100%' }}>
                <Image
                  src={block.content.src}
                  alt={block.content.altText || ''}
                  className="rounded-lg shadow-lg"
                  sizes="(max-width: 768px) 100vw, 800px"
                  width={800}
                  height={450}
                  loading="lazy"
                />
                {block.content.caption && (
                  <figcaption className="mt-2 text-center text-sm text-gray-500 italic">{block.content.caption}</figcaption>
                )}
              </figure>
            );
          case 'video':
            return (
              <div key={index} className="my-8 rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
                {block.content.src.includes('youtube') || block.content.src.includes('youtu.be') ? (
                  <iframe
                    className="w-full h-[300px]"
                    src={block.content.src.replace('/watch?v=', '/embed/')}
                    title="Video"
                    frameBorder="0"
                    allowFullScreen
                    loading="lazy"
                  />
                ) : (
                  <video
                    className="w-full h-[300px] object-cover"
                    poster={block.content.poster || undefined}
                    controls
                    preload="metadata"
                  >
                    <source src={block.content.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
                {block.content.captions && <p className="p-4 text-sm text-gray-500">{block.content.captions}</p>}
              </div>
            );
          case 'audio':
            return (
              <div key={index} className="my-8 rounded-lg border border-gray-200 bg-gray-50 p-4">
                <audio className="w-full" controls preload="metadata" src={block.content.src} />
                {block.content.transcript && (
                  <div className="mt-4">
                    <p className="text-sm font-semibold text-gray-900 mb-2">Transcript</p>
                    <p className="text-sm text-gray-600">{block.content.transcript}</p>
                  </div>
                )}
              </div>
            );
          case 'button':
            return (
              <div key={index} className={`my-8 flex justify-${block.content.alignment || 'center'}`}>
                <a
                  href={block.content.url || '#'}
                  className={`px-6 py-3 rounded-lg text-white font-medium transition-colors ${
                    block.content.style === 'primary'
                      ? 'bg-gradient-to-r from-[#B28B53] to-[#9A7540]'
                      : block.content.style === 'secondary'
                        ? 'bg-gray-700'
                        : 'border-2 border-[#B28B53] text-[#B28B53] bg-transparent'
                  }`}
                >
                  {block.content.text}
                </a>
              </div>
            );
          case 'columns':
            return (
              <div key={index} className="my-8 grid gap-6" style={{ gridTemplateColumns: `repeat(${block.content.colCount || 2}, 1fr)` }}>
                {block.content.columns?.map((col: any, ci: number) => (
                  <div key={ci} className="space-y-4">
                    {col.blocks?.map((b: any, bi: number) => (
                      <div key={bi} className="blog-block-renderer" />
                    ))}
                  </div>
                ))}
              </div>
            );
          case 'divider':
            return (
              <hr key={index} className={`my-8 border-0 ${block.content.style === 'dashed' ? 'border-t-2 border-dashed' : 'border-t'} border-gray-200`} />
            );
          case 'spacer':
            return (
              <div key={index} className="my-4" style={{ height: block.content.height || '2rem' }} />
            );
          case 'blockquote':
            return (
              <blockquote key={index} className="my-8 p-6 rounded-lg border-l-4 border-[#B28B53] bg-gray-50 italic text-gray-700">
                <p className="text-lg">{block.content.text}</p>
                {block.content.attribution && <p className="mt-4 text-right text-sm font-semibold text-gray-500">— {block.content.attribution}</p>}
              </blockquote>
            );
          case 'callout':
            return (
              <div key={index} className="my-8 p-4 rounded-lg" className={block.content.type === 'info' ? 'border-l-4 border-blue-500 bg-blue-50 text-blue-700' : block.content.type === 'warning' ? 'border-l-4 border-amber-500 bg-amber-50 text-amber-700' : block.content.type === 'error' ? 'border-l-4 border-red-500 bg-red-50 text-red-700' : 'border-l-4 border-emerald-500 bg-emerald-50 text-emerald-700'}>
                <span className="font-bold mr-2">{block.content.type === 'info' ? 'ℹ️' : block.content.type === 'warning' ? '⚠️' : block.content.type === 'error' ? '❌' : '✅'}</span>
                {block.content.text}
              </div>
            );
          case 'faq':
            return (
              <div key={index} className="my-8 rounded-lg border border-gray-200 bg-gray-50 p-6">
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-[#B28B53] font-bold text-sm">Q:</span>
                  <p className="text-gray-900">{block.content.question}</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-gray-600 font-bold text-sm">A:</span>
                  <p className="text-gray-700">{block.content.answer}</p>
                </div>
              </div>
            );
          case 'toc':
            return (
              <div key={index} className="my-8 p-6 rounded-lg border border-gray-200 bg-gray-50">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">Table of Contents</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  {headingBlocks.map((h: any, hi: number) => (
                    <li key={hi} className="pl-2 border-l-2 border-[#B28B53]/30">
                      <Link href={`#heading-${hi}`} className="hover:text-[#B28B53] transition-colors">
                        {h.content.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          case 'backlink':
            return (
              <div key={index} className={`my-8 flex justify-${block.content.alignment || 'left'}`}>
                <a
                  href={block.content.url || '#'}
                  className={`text-[#B28B53] hover:underline font-medium ${block.content.rel === 'nofollow' ? 'text-gray-500' : ''}`}
                  rel={block.content.rel === 'dofollow' ? undefined : block.content.rel}
                >
                  {block.content.text || block.content.url}
                </a>
              </div>
            );
          case 'embed':
            return (
              <div key={index} className="my-8 rounded-lg overflow-hidden border border-gray-200 max-w-md mx-auto">
                <iframe
                  className="w-full h-[300px]"
                  src={block.content.url}
                  title="Embed"
                  frameBorder="0"
                  loading="lazy"
                />
              </div>
            );
          case 'spacer':
            return null;
          default:
            return null;
        }
      })}
    </article>
  );
}
