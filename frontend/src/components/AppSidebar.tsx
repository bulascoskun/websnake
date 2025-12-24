import { Separator } from '@/components/ui/separator';
import websnakeLogo from '@/assets/websnake.svg';
import CustomSidebarFooter from './CustomSidebarFooter';
import { List, User, Brain, Home } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Link } from 'react-router';

// Menu items.
const items = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
  },
  {
    title: 'Domains',
    url: '/domains',
    icon: List,
  },
  {
    title: 'Insights',
    url: '/insights',
    icon: Brain,
  },
  {
    title: 'Account',
    url: '/account',
    icon: User,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <Link to="/" className="flex items-center justify-center gap-4">
          <img src={websnakeLogo} alt="Websnake" className="h-6" />
          {/* <div className="font-semibold">Dashboard</div> */}
        </Link>
      </SidebarHeader>

      <Separator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <Separator />

      <CustomSidebarFooter />
    </Sidebar>
  );
}
