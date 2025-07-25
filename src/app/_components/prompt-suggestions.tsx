
'use client'
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Sparkles, ArrowRight, LayoutPanelLeft, Crown, FileText, ShoppingBag, GlassWater, Truck, Mail, Package } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


const suggestions = [
  { prompt: "Logo engraved on a wooden plaque", icon: LayoutPanelLeft },
  { prompt: "3D puff embroidery on a snapback hat", icon: Crown },
  { prompt: "Letterpress on thick cotton paper", icon: FileText },
  { prompt: "Screen-printed on a tote bag", icon: ShoppingBag },
  { prompt: "Laser etched on a metal water bottle", icon: GlassWater },
  { prompt: "On the side of a delivery truck", icon: Truck },
  { prompt: "As a wax seal on an envelope", icon: Mail },
  { prompt: "Molded in plastic on a product", icon: Package },
];


export default function PromptSuggestions() {
  const pathname = usePathname();
  const isGeneratePage = pathname === '/generate';

  return (
    <section className="container mx-auto py-12 md:py-24 lg:py-32">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Prompt Inspiration</h2>
        <p className="mt-4 text-muted-foreground md:text-xl">Not sure what to write? Try one of these.</p>
      </div>
      <Carousel opts={{ align: "start", loop: true }} className="w-full">
        <CarouselContent>
          {suggestions.map(({ prompt, icon: Icon }, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <Link href={`/generate?prompt=${encodeURIComponent(prompt)}`}>
                  <Card className="bg-secondary/50 border-border/50 h-full rounded-none">
                    <CardContent className="flex flex-col gap-4 aspect-video items-center justify-center p-6 cursor-pointer">
                      <Icon className="h-8 w-8 text-primary" />
                      <span className="text-lg font-semibold text-center">{prompt}</span>
                    </CardContent>
                  </Card>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
      {!isGeneratePage && (
        <div className="mt-8 flex justify-center">
          <Button asChild className="button-gradient">
              <Link href="/generate">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Go to the Generator
                  <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
          </Button>
        </div>
      )}
    </section>
  );
}

