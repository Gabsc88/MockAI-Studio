'use server';
/**
 * @fileOverview A flow for generating random mockup prompts.
 *
 * - generateRandomPrompt - A function that generates a random prompt for mockup creation.
 * - GenerateRandomPromptInput - The input type for the generateRandomPrompt function (empty object).
 * - GenerateRandomPromptOutput - The return type for the generateRandomPrompt function (string).
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRandomPromptInputSchema = z.object({});
export type GenerateRandomPromptInput = z.infer<typeof GenerateRandomPromptInputSchema>;

const GenerateRandomPromptOutputSchema = z.object({
  prompt: z.string().describe('A random prompt for generating mockups.'),
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
  prompt: `You are a creative prompt generator for a logo mockup application. Generate a single, imaginative prompt for creating a logo mockup.  The prompt should be short, but descriptive.

Examples:
* Gold foil on black card
* 3D sign on office wall
* Embroidery on fabric
* Logo on a coffee cup
* Neon sign in a bar
* Embossed on leather

Do not repeat these examples.

Output:
`, // No Handlebars variables since it's generative
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
