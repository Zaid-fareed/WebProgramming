import "./global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* This "children" is where your login/signup pages will appear */}
        <main>{children}</main>
      </body>
    </html>
  );
}