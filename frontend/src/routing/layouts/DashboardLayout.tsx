import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Toaster } from '@/components/ui/sonner';
import { Outlet } from 'react-router';
import { Separator } from '@/components/ui/separator';

export default function Layout() {
  return (
    <>
      <Toaster />

      <SidebarProvider>
        <AppSidebar />

        <main className="flex-1 min-h-screen bg-gray-50">
          <header className="h-10 flex items-center gap-2 px-4">
            <SidebarTrigger />
            <h1 className="text-sm font-medium text-gray-700">
              Toggle Sidebar
            </h1>
          </header>

          <Separator />

          <section className="container mx-auto px-4 sm:px-8 lg:px-16 xl:px-20 2xl:px-24 pt-4 sm:pt-6">
            <Outlet />
          </section>
        </main>
      </SidebarProvider>
    </>
  );
}
