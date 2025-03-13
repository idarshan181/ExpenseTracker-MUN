import { handleSignOut } from '@/app/actions/actions';
import { ChevronDown, Heart, Layers2, LogOut, Settings } from 'lucide-react';
import Link from 'next/link';
import { useMemo } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';

interface iAppProps {
  email: string;
  name: string;
  image: string;
}

export default function UserDropdown({ email, name, image }: iAppProps) {
  const initials = useMemo(() => {
    return name
      .split(' ')
      .map(word => word[0].toUpperCase())
      .join('');
  }, [name]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
          <Avatar>
            <AvatarImage src={image} alt="Profile Image" />
            <AvatarFallback>
              {initials}
            </AvatarFallback>
          </Avatar>
          <ChevronDown size={16} strokeWidth={2} className="ml-2 opacity-60" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="flex flex-col">
          <span className="text-sm font-medium text-foreground">{name}</span>
          <span className="text-xs text-muted-foreground">{email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="cursor-pointer">
          <DropdownMenuItem asChild>
            <Link href="/budgets" className="cursor-pointer">
              <Heart size={16} strokeWidth={2} className="opacity-60" />
              <span>Budget</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/dashboard" className="cursor-pointer">
              <Layers2 size={16} strokeWidth={2} className="opacity-60" />
              <span>My Expenses</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/settings" className="cursor-pointer">
              <Settings size={16} strokeWidth={2} className="opacity-60" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>

        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <form action={handleSignOut}>
            <button type="submit" className="flex w-full items-center gap-2">
              <LogOut size={16} strokeWidth={2} className="opacity-60" />
              <span>Log out</span>
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

  );
}
