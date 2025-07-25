
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import HowItWorks from './how-it-works';
import UseCases from './use-cases';
import PromptSuggestions from './prompt-suggestions';
import MockupShowcase from './mockup-showcase';
import Technology from './technology';
import ForTeams from './for-teams';
import Testimonials from './testimonials';
import Pricing from './pricing';
import FinalCta from './final-cta';
import { ArrowRight, Youtube } from 'lucide-react';

const prompts = [
  "Gold foil on black card",
  "3D sign on office wall",
  "Embroidery on fabric",
  "Logo on a coffee cup",
  "Neon sign in a bar",
  "Embossed on leather",
];

const Typewriter = () => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [text, setText] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if(!isMounted) return;

    if (subIndex === prompts[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 2000);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % prompts.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 75 : 150);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, isMounted]);

  useEffect(() => {
    if(!isMounted) return;
    setText(prompts[index].substring(0, subIndex));
  }, [subIndex, index, isMounted]);

  if (!isMounted) {
    return <span className="font-mono text-lg md:text-xl bg-gradient-to-r from-[#E85D70] to-[#8F6AE0] bg-clip-text text-transparent">&nbsp;</span>;
  }

  return (
    <span className="font-mono text-lg md:text-xl bg-gradient-to-r from-[#E85D70] to-[#8F6AE0] bg-clip-text text-transparent">
      {text}
      <span className="animate-ping">|</span>
    </span>
  );
};

export default function HeroSection() {
  return (
    <>
      <section id="hero" className="relative w-full overflow-hidden pt-24 md:pt-32">
          <div 
              aria-hidden="true" 
              className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_20%,_hsl(var(--primary)/0.15),_transparent_50%)]"
          />
        <div className="container mx-auto grid grid-cols-1 items-center gap-8 px-4 md:grid-cols-2 md:px-6 lg:gap-16">
          <div className="flex flex-col items-start space-y-6">
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Bring Your Logo to Life in Stunning Mockups
            </h1>
            <p className="max-w-[600px] text-lg text-muted-foreground md:text-xl">
              Upload your transparent logo. Describe your scene. Let our AI handle the rest.
            </p>
            <div className="flex w-full items-center space-x-2">
              <Typewriter />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="button-gradient">
                    <Link href="/generate">
                        Generate Now
                        <ArrowRight className="h-5 w-5" />
                    </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                   <Link href="#">
                        <Youtube className="mr-2 h-5 w-5" />
                        See Demo
                    </Link>
                </Button>
            </div>
          </div>
          <div className="relative flex items-center justify-center">
              <Image
                  src="https://placehold.co/1024x1024.png"
                  alt="AI generated mockup showcase"
                  width={1024}
                  height={1024}
                  className="h-full w-full object-cover rounded-2xl shadow-2xl shadow-primary/10"
                  data-ai-hint="logo mockup collage"
              />
          </div>
        </div>
      </section>
      <div id="interactive-components">
        <HowItWorks />
        <UseCases />
        <PromptSuggestions />
        <MockupShowcase />
        <Technology />
        <ForTeams />
        <Testimonials />
        <Pricing />
        <FinalCta />
      </div>
    </>
  );
}
