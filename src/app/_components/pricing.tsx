import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Check } from 'lucide-react';

const plans = [
    {
        name: "Free",
        price: "$0",
        description: "For individuals trying things out.",
        features: ["5 mockups per month", "Watermarked images", "Standard resolution"],
        cta: "Start for Free"
    },
    {
        name: "Pro",
        price: "$19",
        description: "For professionals and freelancers.",
        features: ["Unlimited mockups", "No watermarks", "High resolution", "Priority support"],
        cta: "Upgrade Now",
        popular: true
    },
    {
        name: "Studio",
        price: "$49",
        description: "For agencies and design teams.",
        features: ["All Pro features", "Team collaboration", "Brand kits", "Batch generation"],
        cta: "Contact Sales"
    }
];

export default function Pricing() {
    return (
        <section id="pricing" className="bg-secondary/30 py-12 md:py-24 lg:py-32">
            <div className="container mx-auto">
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Pricing Plans</h2>
                    <p className="mt-4 text-muted-foreground md:text-xl">Choose the plan that's right for you.</p>
                </div>
                <div className="flex items-center justify-center space-x-2 mb-8">
                    <Label htmlFor="plan-toggle">Monthly</Label>
                    <Switch id="plan-toggle" />
                    <Label htmlFor="plan-toggle">Yearly</Label>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {plans.map((plan) => (
                        <Card key={plan.name} className={plan.popular ? "border-primary" : ""}>
                            <CardHeader>
                                <CardTitle>{plan.name}</CardTitle>
                                <CardDescription>{plan.description}</CardDescription>
                                <div className="pt-4">
                                    <span className="text-4xl font-bold">{plan.price}</span>
                                    <span className="text-sm text-muted-foreground">/month</span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2">
                                    {plan.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-2">
                                            <Check className="h-4 w-4 icon-gradient" />
                                            <span className="text-sm text-muted-foreground">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button className={`w-full ${plan.popular ? 'button-gradient' : ''}`} variant={plan.popular ? "default" : "outline"}>{plan.cta}</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
