
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
            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
                <Card className="bg-secondary/50">
                    <CardContent className="p-8 grid grid-cols-2 gap-8">
                        {tech.map((item) => (
                            <div key={item.name} className="flex items-center gap-4">
                                <item.icon className="h-8 w-8 icon-gradient" />
                                <span className="font-semibold">{item.name}</span>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                <div className="flex items-center justify-around text-muted-foreground p-8 rounded-lg bg-secondary/50">
                    <div className="flex flex-col items-center text-center">
                        <Image src="https://placehold.co/100x100/transparent/000000.png?text=Logo" alt="Flat Logo" width={100} height={100} data-ai-hint="logo placeholder" />
                        <p className="mt-2 text-sm font-semibold">Your Flat Logo</p>
                    </div>
                    <ArrowRight className="h-12 w-12 icon-gradient" />
                    <div className="flex flex-col items-center text-center">
                        <Image src="https://placehold.co/100x100/8F6AE0/FFFFFF.png?text=3D" alt="3D Mockup" width={100} height={100} className="rounded-lg shadow-lg" data-ai-hint="3d render" />
                        <p className="mt-2 text-sm font-semibold">Final Mockup</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
