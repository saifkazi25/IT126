export const metadata = {
  title: 'Infinite Tsukuyomi',
  description: 'Discover your dream fantasy world',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
