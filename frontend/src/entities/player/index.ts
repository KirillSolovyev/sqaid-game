import { generateText, streamText } from 'ai';
import type { LanguageModel, CoreMessage, ToolSet } from 'ai';

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

  streamText(messages: CoreMessage[], tools?: ToolSet) {
    return streamText({
      model: this.model,
      messages: [...this.instructions, ...messages],
      tools,
    });
  }
}
