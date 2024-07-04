import axios from "axios";
import { Transcript } from "../Interfaces/Transcript";

export const retrieveTranscriptList = async () => {
    const response = await axios.get(
      'https://verbit-karaoke-assignment.vercel.app/api/transcripts'
    );
    return response.data;
  };

  export const retrieveTranscriptById = async (transcriptId: string | undefined) => {
    const response = await axios.get(
        `https://verbit-karaoke-assignment.vercel.app/api/transcripts/${transcriptId}`
    );
    return response.data;
  };