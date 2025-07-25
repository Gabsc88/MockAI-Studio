
'use client';

import { useState, useImperativeHandle, forwardRef, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { generateMockup } from '@/ai/flows/generate-mockup';
import { generateRandomPrompt } from '@/ai/flows/generate-prompt';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { UploadCloud, Wand2, Sparkles, Download } from 'lucide-react';
import React from 'react';

const formSchema = z.object({
  prompt: z.string().min(5, 'Please enter a more descriptive prompt.'),
  logo: z.any().refine((file) => file instanceof File, 'Logo file is required.'),
});

type MockupGeneratorProps = {
    onMockupGenerated: (url: string | null) => void;
    onLoadingChange: (loading: boolean) => void;
};

export type MockupGeneratorRef = {
  setPrompt: (prompt: string) => void;
  focusUpload: () => void;
};

const MockupGenerator = forwardRef<MockupGeneratorRef, MockupGeneratorProps>(
  ({ onMockupGenerated, onLoadingChange }, ref) => {
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isPromptLoading, setIsPromptLoading] = useState(false);
    const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
    const { toast } = useToast();
    const uploadRef = useRef<HTMLInputElement>(null);

    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        prompt: '',
        logo: undefined,
      },
    });

    useImperativeHandle(ref, () => ({
      setPrompt(prompt: string) {
        form.setValue('prompt', prompt, { shouldValidate: true });
      },
      focusUpload() {
        uploadRef.current?.click();
      }
    }));

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        if (file.size > 4 * 1024 * 1024) {
          toast({
              variant: "destructive",
              title: "File too large",
              description: "Please upload a logo smaller than 4MB.",
          });
          return;
        }
        setLogoFile(file);
        form.setValue('logo', file, { shouldValidate: true });
        const reader = new FileReader();
        reader.onloadend = () => {
          setLogoPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
    
    const handleRandomPrompt = async () => {
      setIsPromptLoading(true);
      try {
          const result = await generateRandomPrompt({});
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
          form.setError('logo', { type: 'manual', message: 'Logo file is required.' });
          return;
      }
      setIsLoading(true);
      onLoadingChange(true);
      setGeneratedImageUrl(null);
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
            setGeneratedImageUrl(result.mockupDataUri);
            onMockupGenerated(result.mockupDataUri);
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
        toast({
          variant: "destructive",
          title: "Generation Failed",
          description: "Something went wrong. Please try another prompt or logo.",
        });
        setIsLoading(false);
        onLoadingChange(false);
      }
    };
    
    const totalLoading = isLoading || isPromptLoading;

    return (
      <Card className="w-full bg-secondary/50 border-border/50">
        <CardContent className="p-4 md:p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
                  <FormField
                    control={form.control}
                    name="logo"
                    render={({ field }) => (
                    <FormItem className="md:col-span-1 flex flex-col">
                        <label htmlFor="logo-upload" className="block text-sm font-medium mb-2">Your Logo</label>
                        <FormControl className="flex-grow">
                            <div className="relative flex items-center justify-center w-full h-full border-2 border-dashed rounded-lg cursor-pointer border-muted-foreground/50 hover:border-primary transition-colors">
                                <Input ref={uploadRef} id="logo-upload" type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/png, image/svg+xml" onChange={handleFileChange} disabled={totalLoading}/>
                                {logoPreview ? (
                                    <img src={logoPreview} alt="Logo preview" className="h-full w-full object-contain p-2" />
                                ) : (
                                    <div className="text-center text-muted-foreground p-2">
                                        <UploadCloud className="mx-auto h-8 w-8" />
                                        <p className="text-xs">PNG or SVG, &lt;4MB</p>
                                    </div>
                                )}
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                  />
                  <div className="md:col-span-2 flex flex-col">
                      <FormField
                        control={form.control}
                        name="prompt"
                        render={({ field }) => (
                          <FormItem className="flex flex-col flex-grow">
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
                  </div>
              </div>
              
              {generatedImageUrl && !isLoading && (
                   <a href={generatedImageUrl} download="mockup.png" className="w-full">
                      <Button type="button" variant="outline" className="w-full">
                          <Download className="mr-2 h-4 w-4" /> Download Mockup
                      </Button>
                  </a>
              )}

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
            </form>
          </Form>
        </CardContent>
      </Card>
    );
  }
);
MockupGenerator.displayName = "MockupGenerator";

export default MockupGenerator;
