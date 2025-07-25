import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

const useCases = [
    { title: "Stationery & Cards", image: "https://placehold.co/600x400.png", hint: "business card" },
    { title: "Wall Signage", image: "https://placehold.co/600x400.png", hint: "office signage" },
    { title: "Clothing & Embroidery", image: "https://placehold.co/600x400.png", hint: "shirt embroidery" },
    { title: "Product Packaging", image: "https://placehold.co/600x400.png", hint: "box packaging" },
    { title: "Social Media Branding", image: "https://placehold.co/600x400.png", hint: "social media" },
    { title: "Vehicle Wraps", image: "https://placehold.co/600x400.png", hint: "car wrap" },
];

export default function UseCases() {
    return (
        <section className="bg-secondary/30 py-12 md:py-24 lg:py-32">
            <div className="container mx-auto">
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Endless Possibilities</h2>
                    <p className="mt-4 text-muted-foreground md:text-xl">Visualize your brand in any scenario you can imagine.</p>
                </div>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {useCases.map((useCase) => (
                        <Card key={useCase.title} className="group overflow-hidden rounded-xl cursor-pointer">
                            <CardContent className="p-0">
                                <div className="relative">
                                    <Image src={useCase.image} alt={useCase.title} width={600} height={400} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" data-ai-hint={useCase.hint} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                                    <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">{useCase.title}</h3>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
