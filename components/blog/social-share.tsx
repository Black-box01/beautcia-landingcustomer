'use client';

import { Share, Facebook, Twitter, LinkedIn, Mail } from 'lucide-react';

interface SocialShareProps {
  title: string;
  url: string;
}

export function SocialShare({ title, url }: SocialShareProps) {
  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
  };

  return (
    <div className="flex items-center gap-2 pt-6 border-t border-gray-200">
      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Share:</span>
      <a href={shareUrls.facebook} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors" title="Share on Facebook">
        <Facebook className="w-4 h-4" />
      </a>
      <a href={shareUrls.twitter} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[#1DA1F2] text-white hover:bg-[#0d8bd3] transition-colors" title="Share on X (Twitter)">
        <Twitter className="w-4 h-4" />
      </a>
      <a href={shareUrls.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[#0A66C2] text-white hover:bg:#004494] transition-colors" title="Share on LinkedIn">
        <LinkedIn className="w-4 h-4" />
      </a>
      <a href={shareUrls.whatsapp} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[#25D366] text-white hover:bg-[#1ebe5d] transition-colors" title="Share on WhatsApp">
        <Mail className="w-4 h-4" />
      </a>
    </div>
  );
}
