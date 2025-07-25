
'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function FinalCta() {
  return (
    <section className="relative w-full overflow-hidden bg-primary/10 py-12 md:py-24 lg:py-32">
        <div 
            aria-hidden="true" 
            className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_hsl(var(--primary)/0.1),_transparent_70%)]"
        />
        <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Your Logo Deserves More Than a Flat Image</h2>
            <p className="mx-auto mt-4 max-w-[600px] text-muted-foreground md:text-xl">Upload it now and see the transformation.</p>
            <div className="mt-8">
                <Button size="lg" asChild className="button-gradient">
                    <Link href="/generate">
                        Get Started
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>
        </div>
    </section>
  );
}
