import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const testimonials = [
    {
        name: "Sarah L.",
        role: "Lead Designer, Acme Co.",
        quote: "Mockup Studio AI has saved us countless hours. What used to take half a day in Photoshop now takes two minutes. The results are incredible.",
        avatar: "https://placehold.co/100x100.png"
    },
    {
        name: "Mike R.",
        role: "Freelance Brand Strategist",
        quote: "This is a game-changer for presenting brand concepts to clients. The realism helps them visualize the final product instantly.",
        avatar: "https://placehold.co/100x100.png"
    },
    {
        name: "Jian T.",
        role: "Startup Founder",
        quote: "As a non-designer, I could finally create professional mockups for our pitch deck without hiring an expensive agency. Highly recommended!",
        avatar: "https://placehold.co/100x100.png"
    }
];

export default function Testimonials() {
    return (
        <section id="testimonials" className="container mx-auto py-12 md:py-24 lg:py-32">
            <div className="mx-auto mb-12 max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Loved by Creatives Worldwide</h2>
                <p className="mt-4 text-muted-foreground md:text-xl">Don't just take our word for it. Here's what our users are saying.</p>
            </div>
            <Carousel opts={{ loop: true }} className="w-full max-w-4xl mx-auto">
                <CarouselContent>
                    {testimonials.map((testimonial, index) => (
                        <CarouselItem key={index}>
                            <Card className="bg-transparent border-none">
                                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                                    <Avatar className="h-20 w-20 mb-4">
                                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint="person face" />
                                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <p className="text-xl italic text-foreground mb-4">"{testimonial.quote}"</p>
                                    <h3 className="font-semibold">{testimonial.name}</h3>
                                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </section>
    );
}
