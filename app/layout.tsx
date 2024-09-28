import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';

// antialiased: 글꼴을 부드럽게 만듦

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
