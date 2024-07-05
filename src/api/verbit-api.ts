import axiosInstance from "../axiosInstance";
import { Transcript } from "../Interfaces/Transcript";

const GET_TRANSCRIPT_API: string = 'transcripts';
const GET_TRANSCRIPT_BY_ID_API: string = 'transcripts/';

export const retrieveTranscriptList = async () => {
  try {
    const response = await axiosInstance.get<Transcript[]>(
      GET_TRANSCRIPT_API
    );
    return response.data;

  } catch (error: any) {
    throw new Error(`Error fetching transcript list: ${error.message}`);
  }
};

export const retrieveTranscriptById = async (transcriptId: string | undefined) => {
  try {
    const response = await axiosInstance.get(
      GET_TRANSCRIPT_BY_ID_API + transcriptId
    );
    return response.data;

  } catch (error: any) {
    throw new Error(`Error fetching transcript by id: ${error.message}`);
  }
};