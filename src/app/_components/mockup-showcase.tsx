import Image from 'next/image';
import { Button } from '@/components/ui/button';

export default function MockupShowcase() {
  return (
    <section className="bg-secondary/30 py-12 md:py-24 lg:py-32">
        <div className="container mx-auto">
            <div className="mx-auto mb-12 max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Mockup Showcase</h2>
                <p className="mt-4 text-muted-foreground md:text-xl">See what our AI can create.</p>
            </div>
            <div className="flex justify-center gap-2 mb-8">
                <Button>All</Button>
                <Button variant="outline">2D</Button>
                <Button variant="outline">3D</Button>
                <Button variant="outline">Textured</Button>
                <Button variant="outline">Animated</Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="group aspect-square overflow-hidden rounded-lg cursor-pointer">
                        <Image src={`https://placehold.co/600x600.png`} alt={`Showcase image ${i+1}`} width={600} height={600} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint="logo mockup" />
                    </div>
                ))}
            </div>
        </div>
    </section>
  )
}
