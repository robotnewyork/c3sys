import React, { useState } from 'react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from './ui/navigation-menu';
import { Menu, Music } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navigationItems = [
    { label: 'Home', href: 'home' },
    {
      label: 'Projects',
      href: 'projects',
      children: [
        { label: 'All Projects', href: 'projects' },
        { label: 'Slum Denizens', href: 'project/slum-denizens' },
        { label: 'Lee & the Lips', href: 'project/lee-and-the-lips' },
        { label: 'Paranoia', href: 'project/paranoia' }
      ]
    },
    { label: 'Releases', href: 'releases' },
    { label: 'Blog', href: 'blog' },
    { label: 'Gear', href: 'gear' },
    { label: 'Timeline', href: 'timeline' },
    { label: 'Back Catalog', href: 'back-catalog' },
    { label: 'About', href: 'about' },
    { label: 'Contact', href: 'contact' },
  ];

  const handleNavigation = (href: string) => {
    onNavigate(href);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-electric-pink/30 bg-void/90 backdrop-blur supports-[backdrop-filter]:bg-void/80 shadow-grunge">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => handleNavigation('home')}>
          <Music className="h-6 w-6 text-white" />
          <span className="font-bold text-lg text-white">C3.SYS</span>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu 
          className="hidden md:flex navigation-menu-enhanced rounded-md px-3 py-1"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
        >
          <NavigationMenuList>
            {navigationItems.map((item) => (
              <NavigationMenuItem key={item.href}>
                {item.children ? (
                  <>
                    <NavigationMenuTrigger
                      className={currentPage.startsWith(item.href) ? 'bg-accent' : ''}
                    >
                      {item.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid w-48 p-2">
                        {item.children.map((child) => (
                          <Button
                            key={child.href}
                            variant="ghost"
                            className="justify-start"
                            onClick={() => handleNavigation(child.href)}
                          >
                            {child.label}
                          </Button>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <Button
                    variant="ghost"
                    className={currentPage === item.href ? 'bg-accent' : ''}
                    onClick={() => handleNavigation(item.href)}
                  >
                    {item.label}
                  </Button>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 bg-white">
            <div className="flex flex-col space-y-4 mt-8">
              {navigationItems.map((item) => (
                <div key={item.href}>
                  <Button
                    variant={currentPage === item.href ? 'default' : 'ghost'}
                    className="w-full justify-start text-gray-700"
                    onClick={() => handleNavigation(item.href)}
                  >
                    {item.label}
                  </Button>
                  {item.children && (
                    <div className="ml-4 mt-2 space-y-2">
                      {item.children.map((child) => (
                        <Button
                          key={child.href}
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-muted-foreground"
                          onClick={() => handleNavigation(child.href)}
                        >
                          {child.label}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}