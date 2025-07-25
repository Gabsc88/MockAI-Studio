import { Card, CardContent } from '@/components/ui/card';
import { Cpu, Layers3, Lightbulb, Box } from 'lucide-react';

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
                                <item.icon className="h-8 w-8 text-primary" />
                                <span className="font-semibold">{item.name}</span>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                <div className="flex items-center justify-center text-muted-foreground">
                    <p>[Diagram showing flat logo to final mockup transformation]</p>
                </div>
            </div>
        </section>
    );
}
