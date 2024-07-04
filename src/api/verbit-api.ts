import axios from "axios";

const GET_TRANSCRIPT_API: string = 'https://verbit-karaoke-assignment.vercel.app/api/transcripts';
const GET_TRANSCRIPT_BY_ID_API: string = 'https://verbit-karaoke-assignment.vercel.app/api/transcripts/';

export const retrieveTranscriptList = async () => {
    const response = await axios.get(
      GET_TRANSCRIPT_API
    );
    return response.data;
  };

  export const retrieveTranscriptById = async (transcriptId: string | undefined) => {
    const response = await axios.get(
      GET_TRANSCRIPT_BY_ID_API +transcriptId
    );
    return response.data;
  };