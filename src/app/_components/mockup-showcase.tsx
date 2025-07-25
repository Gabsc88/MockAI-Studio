
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

const images = [
    { src: 'https://placehold.co/600x600/4285F4/FFFFFF.png', alt: 'Blue background mockup', hint: 'logo mockup', title: "T-Shirt" },
    { src: 'https://placehold.co/600x600/4285F4/FFFFFF.png', alt: 'Blue background mockup', hint: 'logo mockup', title: "Business Card" },
    { src: 'https://placehold.co/600x600/4285F4/FFFFFF.png', alt: 'Blue background mockup', hint: 'logo mockup', title: "Phone Case" },
    { src: 'https://placehold.co/600x600/4285F4/FFFFFF.png', alt: 'Blue background mockup', hint: 'logo mockup', title: "Signage" },
    { src: 'https://placehold.co/600x600/4285F4/FFFFFF.png', alt: 'Blue background mockup', hint: 'logo mockup', title: "Coffee Mug" },
    { src: 'https://placehold.co/600x600/4285F4/FFFFFF.png', alt: 'Blue background mockup', hint: 'logo mockup', title: "Laptop Sticker" },
    { src: 'https://placehold.co/600x600/4285F4/FFFFFF.png', alt: 'Blue background mockup', hint: 'logo mockup', title: "Tote Bag" },
    { src: 'https://placehold.co/600x600/4285F4/FFFFFF.png', alt: 'Blue background mockup', hint: 'logo mockup', title: "Hat Embroidery" },
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
                    <Card key={i} className="group overflow-hidden cursor-pointer">
                        <CardContent className="p-0">
                            <div className="relative aspect-square">
                                <Image src={image.src} alt={image.alt} width={600} height={600} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" data-ai-hint={image.hint} />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">{image.title}</h3>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    </section>
  )
}
