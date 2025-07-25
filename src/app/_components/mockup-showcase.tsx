
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const images = [
    { src: 'https://placehold.co/600x600/E85D70/FFFFFF.png', alt: 'Red background mockup', hint: 'logo mockup' },
    { src: 'https://placehold.co/600x600/8F6AE0/FFFFFF.png', alt: 'Purple background mockup', hint: 'logo mockup' },
    { src: 'https://placehold.co/600x600/61BDFD/FFFFFF.png', alt: 'Blue background mockup', hint: 'logo mockup' },
    { src: 'https://placehold.co/600x600/8169D9/FFFFFF.png', alt: 'Dark purple background mockup', hint: 'logo mockup' },
    { src: 'https://placehold.co/600x600/F9A825/FFFFFF.png', alt: 'Yellow background mockup', hint: 'logo mockup' },
    { src: 'https://placehold.co/600x600/4CAF50/FFFFFF.png', alt: 'Green background mockup', hint: 'logo mockup' },
    { src: 'https://placehold.co/600x600/FF5722/FFFFFF.png', alt: 'Orange background mockup', hint: 'logo mockup' },
    { src: 'https://placehold.co/600x600/3F51B5/FFFFFF.png', alt: 'Indigo background mockup', hint: 'logo mockup' },
];

export default function MockupShowcase() {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', '2D', '3D', 'Textured', 'Animated'];

  return (
    <section className="bg-secondary/30 py-12 md:py-24 lg:py-32">
        <div className="container mx-auto">
            <div className="mx-auto mb-12 max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Mockup Showcase</h2>
                <p className="mt-4 text-muted-foreground md:text-xl">See what our AI can create.</p>
            </div>
            <div className="flex justify-center gap-2 mb-8">
                {filters.map((filter) => (
                    <Button 
                        key={filter}
                        variant={activeFilter === filter ? 'default' : 'outline'}
                        onClick={() => setActiveFilter(filter)}
                        className={cn(
                            activeFilter === filter && 'button-showcase-gradient text-primary-foreground',
                            activeFilter !== filter && 'hover:bg-primary/10 hover:border-primary/50'
                        )}
                    >
                        {filter}
                    </Button>
                ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {images.map((image, i) => (
                    <div key={i} className="group aspect-square overflow-hidden rounded-lg cursor-pointer">
                        <Image src={image.src} alt={image.alt} width={600} height={600} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint={image.hint} />
                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}
