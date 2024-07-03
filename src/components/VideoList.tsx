import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import AudioPlayer from './AudioPlayer';
import TranscriptDisplay from './TranscriptDisplay';
import useFetch from '../Effects/useFetch';

interface Transcript {
    id: number;
    name: string;
    audio_url: string;
    paragraphs: Paragraph[];
    words: Word[];
  }
  
  interface Paragraph {
    id: string;
    time: number;
    duration: number;
    speaker_id: string;
  }
  
  interface Word {
    time: number;
    duration: number;
    text: string;
    paragraph_id: string;
  }
  
const TranscriptsList = () => {
    const [transcripts, setTranscripts] = useState<Transcript[]>([]);
    const [selectedTranscript, setSelectedTranscript] = useState<Transcript | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const audioRef = useRef<HTMLVideoElement>(null); // Ref for the <audio> element
    const { data, isPending, errorMessage} = useFetch<Transcript[]>('https://verbit-karaoke-assignment.vercel.app/api/transcripts');

    // useEffect(() => {
    //     const fetchTranscripts = async () => {
    //       setLoading(true);
    //       try {
    //         const response = await axios.get<Transcript[]>('https://verbit-karaoke-assignment.vercel.app/api/transcripts');
    //         setTranscripts(response.data);
    //       } catch (error) {
    //         console.error('Error fetching transcripts:', error);
    //       } finally {
    //         setLoading(false);
    //       }
    //     };
    
    //     fetchTranscripts();
    //   }, []);
    
      const handleTranscriptSelect = async (transcriptId: number) => {
        try {
          const response = await axios.get<Transcript>(`https://verbit-karaoke-assignment.vercel.app/api/transcripts/${transcriptId}`);
          setSelectedTranscript(response.data);
        } catch (error) {
          console.error('Error fetching transcript details:', error);
        }
      };
    
    return ( 
        <div className="App">
        <h1>Karaoke App</h1>
        {loading ? (
          <p>Loading transcripts...</p>
        ) : (
          <div className="transcript-list">
            <h2>Transcripts</h2>
            <ul>
              {data && data.map((transcript: Transcript )=> (
                <div className="song-privew">
                  <div className="song-card" onClick={() => handleTranscriptSelect(transcript.id)}>
                    <p>{transcript.name}</p>
                  </div>
                </div>
  
                // <li key={transcript.id}>
                //   <button onClick={() => handleTranscriptSelect(transcript.id)}>{transcript.name}</button>
                // </li>
              ))}
            </ul>
          </div>
        )}
  
        {selectedTranscript && (
          <div className="selected-transcript">
            <AudioPlayer audioUrl={selectedTranscript.audio_url} audioRef={audioRef} />
            <TranscriptDisplay
              paragraphs={selectedTranscript.paragraphs}
              words={selectedTranscript.words}
              audioRef={audioRef} // Pass audioRef to TranscriptDisplay
            />
          </div>
        )}
      </div>
     );
}
 
export default TranscriptsList;