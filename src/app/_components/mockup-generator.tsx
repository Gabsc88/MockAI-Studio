
'use client';

import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { generateMockup } from '@/ai/flows/generate-mockup';
import { generateRandomPrompt } from '@/ai/flows/generate-prompt';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Wand2, Sparkles, Download, Share2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { ShareDialog } from './share-dialog';


const formSchema = z.object({
  prompt: z.string().min(5, 'Please enter a more descriptive prompt.'),
});

type GeneratedMockupInfo = {
    url: string;
    prompt: string;
};

type MockupGeneratorProps = {
    onMockupGenerated: (info: GeneratedMockupInfo | null) => void;
    onLoadingChange: (loading: boolean) => void;
    logoFile: File | null;
    generatedMockupInfo: GeneratedMockupInfo | null;
};

export type MockupGeneratorRef = {
  setPrompt: (prompt: string) => void;
};

const MockupGenerator = forwardRef<MockupGeneratorRef, MockupGeneratorProps>(
  ({ onMockupGenerated, onLoadingChange, logoFile, generatedMockupInfo }, ref) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isPromptLoading, setIsPromptLoading] = useState(false);
    const { toast } = useToast();
    const searchParams = useSearchParams();
    const initialPrompt = searchParams.get('prompt');

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        prompt: initialPrompt || '',
      },
    });

    React.useEffect(() => {
        if (initialPrompt) {
            form.setValue('prompt', initialPrompt);
        }
    }, [initialPrompt, form]);

    useImperativeHandle(ref, () => ({
      setPrompt(prompt: string) {
        form.setValue('prompt', prompt, { shouldValidate: true });
      }
    }));
    
    const handleRandomPrompt = async () => {
      setIsPromptLoading(true);
      const currentPrompt = form.getValues('prompt');
      try {
          const result = await generateRandomPrompt({ prompt: currentPrompt });
          form.setValue('prompt', result.prompt, { shouldValidate: true });
      } catch (error) {
          toast({
              variant: "destructive",
              title: "Error",
              description: "Failed to generate a random prompt. Please try again.",
          });
      } finally {
          setIsPromptLoading(false);
      }
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      if (!logoFile) {
          toast({
              variant: "destructive",
              title: "No Logo",
              description: "Please upload a logo first.",
          });
          return;
      }
      setIsLoading(true);
      onLoadingChange(true);
      onMockupGenerated(null);

      try {
        const reader = new FileReader();
        reader.readAsDataURL(logoFile);
        reader.onload = async () => {
            const logoDataUri = reader.result as string;
            const result = await generateMockup({
              prompt: values.prompt,
              logoDataUri,
            });
            onMockupGenerated({ url: result.mockupDataUri, prompt: values.prompt });
            setIsLoading(false);
            onLoadingChange(false);
        };
        reader.onerror = (error) => {
            console.error("File reading error:", error);
            toast({
                variant: "destructive",
                title: "File Error",
                description: "Could not read the uploaded file. Please try again.",
            });
            setIsLoading(false);
            onLoadingChange(false);
        }
      } catch (error) {
        console.error(error);
        const errorMessage = error instanceof Error ? error.message : "Something went wrong. Please try another prompt or logo.";
        toast({
          variant: "destructive",
          title: "Generation Failed",
          description: errorMessage,
        });
        setIsLoading(false);
        onLoadingChange(false);
      }
    };
    
    const totalLoading = isLoading || isPromptLoading;

    const generatedMockup = generatedMockupInfo?.url;
    const downloadFilename = generatedMockupInfo?.prompt 
      ? `${generatedMockupInfo.prompt.toLowerCase().replace(/\s+/g, '-').slice(0, 30)}.png`
      : 'mockup.png';

    return (
      <Card className="w-full bg-secondary/50 border-border/50">
        <CardContent className="p-4 md:p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="prompt"
                render={({ field }) => (
                  <FormItem className="flex flex-col flex-grow h-48">
                      <div className="flex justify-between items-center mb-2">
                          <label htmlFor={field.name} className="block text-sm font-medium">Describe the Scene</label>
                          <Button type="button" variant="ghost" size="sm" onClick={handleRandomPrompt} disabled={totalLoading}>
                              <Sparkles className="mr-2 h-4 w-4 icon-gradient" /> Inspire Me
                          </Button>
                      </div>
                      <FormControl className="flex-grow">
                          <Textarea placeholder="e.g., 'Embroidered on a dark denim jacket'" className="resize-none h-full" {...field} disabled={totalLoading}/>
                      </FormControl>
                      <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full button-gradient" disabled={totalLoading}>
                {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Generating...
                    </>
                ) : isPromptLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Thinking...
                  </>
                ) : (
                    <>
                      <Wand2 className="mr-2 h-4 w-4" /> Generate Mockup
                    </>
                )}
              </Button>

              {generatedMockup && !isLoading && (
                <div className="w-full flex flex-col sm:flex-row gap-4">
                    <a href={generatedMockup} download={downloadFilename} className="w-full">
                        <Button type="button" variant="outline" className="w-full">
                            <Download className="mr-2 h-4 w-4" /> Download Mockup
                        </Button>
                    </a>
                    <ShareDialog shareUrl={generatedMockup} prompt={generatedMockupInfo?.prompt || 'AI Mockup'}>
                      <Button type="button" variant="outline" className="w-full">
                          <Share2 className="mr-2 h-4 w-4" /> Share
                      </Button>
                    </ShareDialog>
                </div>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
    );
  }
);
MockupGenerator.displayName = "MockupGenerator";

export default MockupGenerator;
