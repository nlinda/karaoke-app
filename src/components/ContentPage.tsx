import React, { useEffect, useRef, useState } from 'react';
import AudioPlayer from './AudioPlayer';
import TranscriptDisplay from './TranscriptDisplay';
import { Transcript } from '../Interfaces/Transcript';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { retrieveTranscriptById } from '../api/verbit-api';
import './ContentPage.css'

export interface RouteParams {
    selectedTranscriptId: string; 
  }
  
const ContentPage: React.FC = () => {
    const { selectedTranscriptId } = useParams(); 
    const [selectedTranscript, setSelectedTranscript] = useState<Transcript | null>(null);
    

    const audioRef = useRef<HTMLVideoElement>(null); // Ref for the <audio> element
     // Query using react-query
     const { data, error, isLoading } = useQuery(['transcript', selectedTranscriptId], () => retrieveTranscriptById(selectedTranscriptId), {
        enabled: !!selectedTranscriptId, // Ensure query is only executed when transcriptId is defined
      });

     
    useEffect(() => {
        if (data) {
            setSelectedTranscript(data);
            // Additional logic as needed
          }
    }, [data]);
    if (isLoading) return <div>Fetching Transcript details...</div>;
    if (error) {
        // Option 1: Basic error message handling
        return <div>'An error occurred'</div>;
      }
    return (
        <div>
            {selectedTranscript && (
                <div className="selected-transcript">
                    <h2>{selectedTranscript.name}</h2>
                    <AudioPlayer audioUrl={selectedTranscript.audio_url} audioRef={audioRef}  
                        />
                    <TranscriptDisplay
                    audioRef={audioRef}  
                        paragraphs={selectedTranscript.paragraphs}
                        words={selectedTranscript.words}
                    />
                </div>
            )}
        </div>
    );
}

export default ContentPage;
