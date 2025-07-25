
import { Card, CardContent } from '@/components/ui/card';
import { Cpu, Layers3, Lightbulb, Box, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const tech = [
    { icon: Cpu, name: "Stable Diffusion" },
    { icon: Layers3, name: "3D Layering" },
    { icon: Lightbulb, name: "Light & Depth Simulation" },
    { icon: Box, name: "High-Fidelity Rendering" }
];

export default function Technology() {
    return (
        <section className="container mx-auto py-12 md:py-24 lg:py-32">
             <div className="mx-auto mb-12 max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Powered by Cutting-Edge AI</h2>
                <p className="mt-4 text-muted-foreground md:text-xl">We use a suite of advanced technologies to create photorealistic results.</p>
            </div>
            <div className="grid grid-cols-1 items-center gap-8">
                 <div className="flex items-center justify-around text-muted-foreground p-8 rounded-lg bg-secondary/50 animate-fade-in">
                    <div className="flex flex-col items-center text-center">
                        <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="rounded-lg">
                             <defs>
                                <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" style={{stopColor: '#4285F4', stopOpacity: 1}} />
                                <stop offset="100%" style={{stopColor: '#8F00FF', stopOpacity: 1}} />
                                </linearGradient>
                            </defs>
                            <rect width="100" height="100" rx="10" fill="#212121"/>
                            <circle cx="50" cy="50" r="25" fill="url(#logo-gradient)"/>
                            <circle cx="50" cy="50" r="15" fill="#212121"/>
                            <circle cx="50" cy="50" r="5" fill="url(#logo-gradient)"/>
                        </svg>
                        <p className="mt-2 text-sm font-semibold">Your Flat Logo</p>
                    </div>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="animate-pulse">
                        <defs>
                            <linearGradient id="arrow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" style={{stopColor: '#E85D70', stopOpacity: 1}} />
                                <stop offset="100%" style={{stopColor: '#8F6AE0', stopOpacity: 1}} />
                            </linearGradient>
                        </defs>
                        <path d="M5 12H19" stroke="url(#arrow-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 5L19 12L12 19" stroke="url(#arrow-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <div className="flex flex-col items-center text-center">
                        <Image src="https://placehold.co/100x100/8F6AE0/FFFFFF.png?text=3D" alt="3D Mockup" width={100} height={100} className="rounded-lg shadow-lg" data-ai-hint="3d render" />
                        <p className="mt-2 text-sm font-semibold">Final Mockup</p>
                    </div>
                </div>
                <Card className="bg-secondary/50">
                    <CardContent className="p-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {tech.map((item) => (
                            <div key={item.name} className="flex flex-col items-center text-center gap-4">
                                <item.icon className="h-8 w-8" style={{ color: '#6A98F5' }} />
                                <span className="font-semibold">{item.name}</span>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
