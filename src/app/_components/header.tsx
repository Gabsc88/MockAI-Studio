
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const Logo = () => (
    <Link href="/" className="flex items-center gap-2" aria-label="MockAI Studio. Home">
      <span className="text-xl font-bold tracking-tighter text-foreground">
        MockAI Studio<span className="icon-gradient">.</span>
      </span>
    </Link>
);

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [searchExpanded, setSearchExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled ? "bg-background/95 shadow-md backdrop-blur-sm" : "bg-transparent"
    )}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-4 md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] bg-background p-6">
                <div className="mb-8">
                  <Logo />
                </div>
                <nav className="flex flex-col gap-4 text-lg">
                    <Link href="#features" className="text-muted-foreground hover:text-foreground">Features</Link>
                    <Link href="#pricing" className="text-muted-foreground hover:text-foreground">Pricing</Link>
                    <Link href="#testimonials" className="text-muted-foreground hover:text-foreground">Testimonials</Link>
                </nav>
              </SheetContent>
            </Sheet>
        </div>
        <div className="hidden md:flex">
          <nav className="flex items-center gap-6 text-sm font-medium">
            <Link href="#features" className="text-muted-foreground transition-colors hover:text-foreground">Features</Link>
            <Link href="#pricing" className="text-muted-foreground transition-colors hover:text-foreground">Pricing</Link>
             <Link href="#testimonials" className="text-muted-foreground transition-colors hover:text-foreground">Testimonials</Link>
          </nav>
        </div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Logo />
        </div>

        <div className="flex items-center gap-2">
            <div 
              className="relative flex items-center"
              onMouseEnter={() => setSearchExpanded(true)}
              onMouseLeave={() => setSearchExpanded(false)}
            >
                <Input 
                    type="search"
                    placeholder="Search here"
                    className={cn(
                        "w-0 transition-all duration-300 ease-in-out pr-8 border-none bg-transparent hover:bg-white/10 hover:rounded-full focus:bg-white/10 focus:rounded-full",
                        searchExpanded && "w-48 pl-4"
                    )}
                />
                <div className={cn(
                    "absolute transition-all duration-300 ease-in-out right-0",
                    searchExpanded ? "right-2" : "right-0"
                )}>
                    <Search className="h-5 w-5 text-muted-foreground" />
                </div>
            </div>
          <Button variant="ghost" className="hidden sm:inline-flex">Log In</Button>
          <Button className="button-gradient">Sign Up</Button>
        </div>
      </div>
    </header>
  );
}
