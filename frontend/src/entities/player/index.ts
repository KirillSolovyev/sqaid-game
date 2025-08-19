import { generateText, generateObject } from 'ai';
import type { LanguageModel, CoreMessage, ToolSet } from 'ai';
import type { ZodSchema } from 'zod';

export class SqaidPlayer {
  name: string;
  model: LanguageModel;
  instructions: CoreMessage[];

  constructor(name: string, model: LanguageModel, instructions: CoreMessage[]) {
    this.name = name;
    this.model = model;
    this.instructions = instructions;
  }

  generateText(messages: CoreMessage[], tools?: ToolSet) {
    return generateText({
      model: this.model,
      messages: [...this.instructions, ...messages],
      tools,
    });
  }

  generateObject(messages: CoreMessage[], schema: ZodSchema) {
    return generateObject({
      model: this.model,
      messages: [...this.instructions, ...messages],
      schema,
    });
  }
}
