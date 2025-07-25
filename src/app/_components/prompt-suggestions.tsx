
'use client'
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import { generateRandomPrompt } from '@/ai/flows/generate-prompt';
import { useToast } from '@/hooks/use-toast';

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

type PromptSuggestionsProps = {
  onSelectPrompt: (prompt: string) => void;
};

export default function PromptSuggestions({ onSelectPrompt }: PromptSuggestionsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSuggestionClick = (prompt: string) => {
    onSelectPrompt(prompt);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleRandomPrompt = async () => {
    setIsLoading(true);
    try {
        const result = await generateRandomPrompt({});
        onSelectPrompt(result.prompt);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to generate a random prompt. Please try again.",
        });
    } finally {
        setIsLoading(false);
    }
  };

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
              <Card onClick={() => handleSuggestionClick(prompt)} className="bg-secondary/50 border-border/50 h-full">
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
        <Button onClick={handleRandomPrompt} disabled={isLoading} className="button-gradient">
           {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate a random prompt
                </>
              )}
        </Button>
      </div>
    </section>
  );
}
