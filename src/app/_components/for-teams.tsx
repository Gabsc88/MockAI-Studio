
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';

const teamFeatures = [
    "Batch Uploads",
    "Client Folders",
    "Watermark Toggle",
    "Team Collaboration"
];

export default function ForTeams() {
    return (
        <section id="teams" className="container mx-auto py-12 md:py-16">
            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Built for Agencies & Studios</h2>
                    <p className="mt-4 max-w-xl text-muted-foreground md:text-xl">Streamline your creative workflow with features designed for collaboration and scale.</p>
                    <div className="mt-8">
                        <Button size="lg" className="button-gradient">Book a Demo</Button>
                    </div>
                </div>
                <Card className="bg-secondary/50">
                    <CardContent className="p-8">
                        <ul className="space-y-4">
                            {teamFeatures.map((feature) => (
                                <li key={feature} className="flex items-center gap-4">
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                        <Check className="h-4 w-4" />
                                    </div>
                                    <span className="text-lg font-medium">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
