'use server';

/**
 * @fileOverview This file defines a Genkit flow to generate descriptions for portfolio projects based on images.
 *
 * The flow takes an image data URI as input and returns a generated project description.
 *
 * - generateProjectDescription - A function that generates a project description from an image.
 * - GenerateProjectDescriptionInput - The input type for the generateProjectDescription function.
 * - GenerateProjectDescriptionOutput - The return type for the generateProjectDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProjectDescriptionInputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      'A photo of a project, as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.'      
    ),
});
export type GenerateProjectDescriptionInput = z.infer<typeof GenerateProjectDescriptionInputSchema>;

const GenerateProjectDescriptionOutputSchema = z.object({
  description: z.string().describe('A description of the project.'),
});
export type GenerateProjectDescriptionOutput = z.infer<typeof GenerateProjectDescriptionOutputSchema>;

export async function generateProjectDescription(
  input: GenerateProjectDescriptionInput
): Promise<GenerateProjectDescriptionOutput> {
  return generateProjectDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProjectDescriptionPrompt',
  input: {schema: GenerateProjectDescriptionInputSchema},
  output: {schema: GenerateProjectDescriptionOutputSchema},
  prompt: `You are a seasoned web development expert tasked with creating compelling descriptions for projects in a portfolio.
  Based on the image provided, craft a concise and engaging description that highlights the project's key features,
  technologies used, and its purpose or impact. Be creative and make it sound appealing to potential clients.

  Image: {{media url=imageDataUri}}`,
});

const generateProjectDescriptionFlow = ai.defineFlow(
  {
    name: 'generateProjectDescriptionFlow',
    inputSchema: GenerateProjectDescriptionInputSchema,
    outputSchema: GenerateProjectDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
