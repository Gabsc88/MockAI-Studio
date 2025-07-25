'use client'
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Sparkles } from 'lucide-react';
import React from 'react';

const suggestions = [
  "Logo engraved on a wooden plaque",
  "3D puff embroidery on a snapback hat",
  "Letterpress on thick cotton paper",
  "Screen-printed on a tote bag",
  "Laser etched on a metal water bottle",
  "On the side of a delivery truck",
  "As a wax seal on an envelope",
  "Molded in plastic on a product",
];

export default function PromptSuggestions() {
  return (
    <section className="container mx-auto py-12 md:py-24 lg:py-32">
      <div className="mx-auto mb-12 max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Prompt Inspiration</h2>
        <p className="mt-4 text-muted-foreground md:text-xl">Not sure what to write? Try one of these.</p>
      </div>
      <Carousel opts={{ align: "start", loop: true }} className="w-full">
        <CarouselContent>
          {suggestions.map((prompt, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <Card className="bg-secondary/50 border-border/50 h-full">
                <CardContent className="flex aspect-video items-center justify-center p-6 cursor-pointer">
                  <span className="text-lg font-semibold text-center">{prompt}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
      <div className="mt-8 flex justify-center">
        <Button className="button-gradient">
          <Sparkles className="mr-2 h-4 w-4" />
          Generate a random prompt
        </Button>
      </div>
    </section>
  );
}
