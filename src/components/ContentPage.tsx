import React, { useEffect, useRef, useState } from 'react';
import AudioPlayer from './AudioPlayer';
import TranscriptDisplay from './TranscriptDisplay';
import { Transcript } from '../Interfaces/Transcript';
import axios from 'axios';
import useFetch from '../Effects/useFetch';

interface ContentPageProps {
    selectedTranscriptId: number; 
}
const ContentPage: React.FC <ContentPageProps>= ({selectedTranscriptId}) => {
    const [selectedTranscript, setSelectedTranscript] = useState<Transcript | null>(null);

    const audioRef = useRef<HTMLVideoElement>(null); // Ref for the <audio> element
    const { data, isPending, errorMessage} = useFetch<Transcript>(`https://verbit-karaoke-assignment.vercel.app/api/transcripts/${selectedTranscriptId}`);

    useEffect(() => {
        setSelectedTranscript(data); // Update selectedTranscript when data changes
    }, [data]);

    return (
        <div>
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

export default ContentPage;
