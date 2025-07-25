import { Upload, Type, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const steps = [
    {
        icon: Upload,
        title: "Upload Your Logo",
        description: "Start with a transparent PNG or SVG. Our AI works best with high-quality logos.",
    },
    {
        icon: Type,
        title: "Describe Your Scene",
        description: "Enter a text prompt or choose a style. Be descriptive for the best results.",
    },
    {
        icon: Download,
        title: "Generate & Download",
        description: "Our AI generates your premium mockup in seconds. Download and impress.",
    },
];

export default function HowItWorks() {
    return (
        <section id="features" className="container mx-auto py-12 md:py-24 lg:py-32">
            <div className="mx-auto mb-12 max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
                <p className="mt-4 text-muted-foreground md:text-xl">A simple, three-step process to stunning mockups.</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
                {steps.map((step, index) => (
                    <Card key={index} className="flex flex-col items-center text-center p-6 border-border/50 hover:border-primary/50 hover:bg-secondary/50 transition-all duration-300 transform hover:-translate-y-2">
                        <CardHeader className="p-0">
                            <div className="mb-4 rounded-full bg-primary/10 p-4">
                                <step.icon className="h-8 w-8 icon-gradient" />
                            </div>
                            <CardTitle>{step.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 mt-2">
                            <p className="text-sm text-muted-foreground">{step.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    );
}
