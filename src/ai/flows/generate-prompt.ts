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
  prompt: `You are a creative prompt generator for a logo mockup application. Your task is to generate a single, imaginative, and detailed prompt for creating a logo mockup. The prompt should be descriptive enough to inspire a unique and visually rich image.

Think about materials, lighting, environment, and style.

Here are some examples of detailed prompts:
* A close-up of a logo embossed in gold foil on a thick, black cardstock business card, with a soft, cinematic side light catching the texture.
* A 3D, backlit logo made of brushed aluminum, mounted on a modern office reception wall made of dark wood panels.
* Realistic embroidery of a logo on the chest of a heather grey t-shirt, showing the texture of the fabric and thread.
* A logo printed on a white ceramic coffee cup, held in someone's hands, with a cozy cafe blurred in the background.
* A vibrant neon sign of a logo glowing on a brick wall inside a dimly lit, moody bar.
* A logo elegantly debossed on the cover of a rich, brown leather-bound journal.

Do not repeat these examples. Generate a new, unique, and detailed prompt.

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
