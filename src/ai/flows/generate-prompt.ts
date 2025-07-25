'use server';
/**
 * @fileOverview A flow for generating random or enhanced mockup prompts.
 *
 * - generateRandomPrompt - A function that generates or enhances a prompt for mockup creation.
 * - GenerateRandomPromptInput - The input type for the generateRandomPrompt function.
 * - GenerateRandomPromptOutput - The return type for the generateRandomPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRandomPromptInputSchema = z.object({
  prompt: z.string().optional().describe('An optional existing prompt to enhance.'),
});
export type GenerateRandomPromptInput = z.infer<typeof GenerateRandomPromptInputSchema>;

const GenerateRandomPromptOutputSchema = z.object({
  prompt: z.string().describe('A random or enhanced prompt for generating mockups.'),
});
export type GenerateRandomPromptOutput = z.infer<typeof GenerateRandomPromptOutputSchema>;

export async function generateRandomPrompt(
  input: GenerateRandomPromptInput
): Promise<GenerateRandomPromptOutput> {
  return generateRandomPromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRandomPromptPrompt',
  input: {schema: GenerateRandomPromptInputSchema},
  output: {schema: GenerateRandomPromptOutputSchema},
  prompt: `You are a creative prompt assistant for a logo mockup application. Your task is to generate a single, imaginative, and detailed prompt for creating a logo mockup.

{{#if prompt}}
The user has provided the following starting point. Take this idea and make it more detailed and descriptive. Expand on it by adding details about materials, lighting, environment, and style to make it a rich and evocative prompt for an AI image generator.

User's idea: {{{prompt}}}
{{else}}
The user has not provided a prompt. Generate a new, unique, and detailed prompt from scratch. Think about materials, lighting, environment, and style. Here are some examples of good prompts to inspire you, but do not use them directly:
* A close-up of a logo embossed in gold foil on a thick, black cardstock business card, with a soft, cinematic side light catching the texture.
* A 3D, backlit logo made of brushed aluminum, mounted on a modern office reception wall made of dark wood panels.
* Realistic embroidery of a logo on the chest of a heather grey t-shirt, showing the texture of the fabric and thread.
* A logo printed on a white ceramic coffee cup, held in someone's hands, with a cozy cafe blurred in the background.
* A vibrant neon sign of a logo glowing on a brick wall inside a dimly lit, moody bar.
* A logo elegantly debossed on the cover of a rich, brown leather-bound journal.
{{/if}}

Output only the final, detailed prompt.`,
});

const generateRandomPromptFlow = ai.defineFlow(
  {
    name: 'generateRandomPromptFlow',
    inputSchema: GenerateRandomPromptInputSchema,
    outputSchema: GenerateRandomPromptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {
      prompt: output!.prompt,
    };
  }
);
