// src/app/layout.jsx
import "./globals.css";
import { ConvexClientProvider } from "./ConvexClientProvider";

export default function RootLayout({ children }) {
  return (
    <html lang="uz">
      <body>
        <ConvexClientProvider>
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
}