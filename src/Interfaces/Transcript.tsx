import { Paragraph } from "./Paragraph";
import { Word } from "./Word";

export interface Transcript {
    id: number;
    name: string;
    audio_url: string;
    paragraphs: Paragraph[];
    words: Word[];
  }
  