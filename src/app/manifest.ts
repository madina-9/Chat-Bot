import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Felix AI',
    short_name: 'Felix',
    description: 'Your intelligent feline assistant',
    start_url: '/',
    display: 'standalone',
    background_color: '#f7f5ef',
    theme_color: '#000000',
    icons: [
      { src: '/felix-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/felix-512.png', sizes: '512x512', type: 'image/png' },
      {
        src: '/felix-maskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
