import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/NavigationMenu'
import { cn } from '@/lib/utils'
import { Home } from 'lucide-react'
import { Link } from 'react-router'

export function Navbar() {
  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link 
                  to="/" 
                  className={cn(navigationMenuTriggerStyle(), "gap-2")}
                >
                  <Home className="size-4" />
                  Home
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  )
}
