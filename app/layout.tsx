"use client";
import './globals.css';
import React, { ReactElement, Suspense, useEffect, useState } from 'react';
import Sidebar from '@/Components/Sidebar';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'next-theme';
import store from '@/store/store';
import { usePathname } from 'next/navigation';
import { CookiesProvider } from 'next-client-cookies/server';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);
  const router = usePathname();
  const hideSidebarRoutes = ['/register','/auth/google/success'];
  const shouldHideSidebar = hideSidebarRoutes.includes(router);

  //sidebar collapse on chatsetting
  useEffect(() => {
    router.includes('chatsetting') ? setIsSidebarCollapsed(true) : setIsSidebarCollapsed(false)
  }, [router])

  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="light" attribute="class">
        <html>
          <head>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Unicase:wght@300;400;500;600;700&family=Crimson+Text:wght@400;600;700&family=EB+Garamond&family=Forum&family=Inter:wght@100..900&family=Pacifico&family=Permanent+Marker&family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" />
          </head>
          <body className="min-h-full flex text-[1vw] flex-col bg-[#F3F4F7] dark:bg-[#1F222A]">
            <div className="flex flex-1">
              {!shouldHideSidebar && (
                <Sidebar isSidebarCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
              )}
              <div className={`flex flex-col flex-1 max-h-[100vh] overflow-hidden ${!shouldHideSidebar ? 'bg-[#F2F4F7] dark:bg-[#1F222A]' : ''}`}>
              {React.cloneElement(children as React.ReactElement)}
              </div>
            </div>
          </body>
        </html>
      </ThemeProvider>
    </Provider>
    
  );
}
