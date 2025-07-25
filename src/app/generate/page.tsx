
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import MockupGenerator from '@/app/_components/mockup-generator';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function GeneratePage() {
  const [generatedMockup, setGeneratedMockup] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerationStatus = (loading: boolean) => {
    setIsLoading(loading);
  };

  const handleMockupResult = (url: string | null) => {
    setGeneratedMockup(url);
    if (url) {
        setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
       <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 shadow-md backdrop-blur-sm">
            <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
                <Link href="/" className="flex items-center gap-2" aria-label="Back to Home">
                    <ArrowLeft className="h-5 w-5" />
                    <span className="text-2xl font-bold tracking-tighter text-foreground">
                        MockAI Studio<span className="icon-gradient">.</span>
                    </span>
                </Link>
            </div>
       </header>
        <main className="flex-1 pt-24 md:pt-32">
             <section className="relative w-full overflow-hidden">
                <div 
                    aria-hidden="true" 
                    className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_20%,_hsl(var(--primary)/0.15),_transparent_50%)]"
                />
                <div className="container mx-auto grid grid-cols-1 items-start gap-8 px-4 md:grid-cols-2 md:px-6 lg:gap-16">
                <div className="flex flex-col items-start space-y-6">
                    <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                        Generate Your Mockup
                    </h1>
                    <p className="max-w-[600px] text-lg text-muted-foreground md:text-xl">
                        1. Upload a transparent logo. <br/>
                        2. Describe the scene for your mockup. <br/>
                        3. Let our AI handle the rest.
                    </p>
                    <div className="w-full max-w-lg">
                        <MockupGenerator onMockupGenerated={handleMockupResult} onLoadingChange={handleGenerationStatus} />
                    </div>
                </div>
                <div className="relative flex items-center justify-center">
                    <Card className="w-full max-w-2xl aspect-square overflow-hidden border-2 border-primary/20 shadow-2xl shadow-primary/10">
                        <CardContent className="p-0">
                            {isLoading ? (
                                <div className="w-full h-full flex flex-col items-center justify-center bg-muted gap-4 p-8 text-center">
                                    <Skeleton className="h-full w-full" />
                                </div>
                            ) : generatedMockup ? (
                                <Image
                                    src={generatedMockup}
                                    alt="AI generated mockup"
                                    width={1024}
                                    height={1024}
                                    className="h-full w-full object-cover transition-all duration-500 ease-in-out hover:scale-105"
                                    data-ai-hint="logo mockup"
                                    unoptimized
                                />
                            ) : (
                                <div className="w-full h-full bg-muted flex flex-col items-center justify-center gap-4 p-8 text-center">
                                     <Image 
                                        src="https://placehold.co/600x400.png"
                                        alt="Placeholder for mockup"
                                        width={600}
                                        height={400}
                                        className="rounded-lg opacity-20"
                                        data-ai-hint="abstract illustration"
                                     />
                                    <p className="text-muted-foreground">Your beautiful mockup will appear here once generated.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
                </div>
            </section>
        </main>
    </div>
  );
}
