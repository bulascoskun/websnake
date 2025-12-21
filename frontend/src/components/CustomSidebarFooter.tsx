import { SidebarFooter } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useAuthStore } from '@/store/useAuthStore';

const CustomSidebarFooter = () => {
  const navigate = useNavigate();
  // store
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  };

  return (
    <SidebarFooter>
      <div className="flex justify-between items-center py-2">
        <div>
          {user?.first_name || ''} {user?.last_name || ''}
        </div>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="icon"
              aria-label="Logout"
            >
              <LogOut />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <div className="py-1">Logout</div>
          </TooltipContent>
        </Tooltip>
      </div>
    </SidebarFooter>
  );
};
export default CustomSidebarFooter;
