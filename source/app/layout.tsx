import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://happy-birthday-my-love.tunnd-2903.chatgpt.site'),
  title: 'Happy Birthday, My Love',
  description: 'Một món quà sinh nhật nhỏ, được gửi bằng tất cả yêu thương.',
  openGraph: {
    title: 'Happy Birthday, My Love',
    description: 'Một món quà nhỏ, gửi bằng tất cả yêu thương.',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Happy Birthday, My Love',
    description: 'Một món quà nhỏ, gửi bằng tất cả yêu thương.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
