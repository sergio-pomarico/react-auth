import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { LogOut, Moon, Settings, Sun, User } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "@/shared/components/theme-provider";
import { SidebarTrigger } from "./ui/sidebar";

interface NavbarProps {
  onPressLogout: () => void;
  user: User | undefined;
}

export default function Navbar({ onPressLogout, user }: NavbarProps) {
  const { setTheme } = useTheme();
  return (
    <nav className="p-4 items-center justify-between flex flex-row  h-16 shrink-0 gap-2 border-b">
      <SidebarTrigger />
      <div className="flex flex-row gap-4 items-center justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={10}>
            <DropdownMenuLabel>
              {user?.email ?? "My Account"}{" "}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings /> Settings
            </DropdownMenuItem>
            <DropdownMenuItem variant="destructive" onClick={onPressLogout}>
              <LogOut /> LogOut
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
