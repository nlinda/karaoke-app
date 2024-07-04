import useFetch from '../Effects/useFetch';
import { Transcript } from '../Interfaces/Transcript';

  interface TranscriptsListProps {
    handleSelectChange: (id: number) => void;
  }

  const VideoList: React.FC <TranscriptsListProps>= ({handleSelectChange}) => {
    const { data, isPending, errorMessage} = useFetch<Transcript[]>('https://verbit-karaoke-assignment.vercel.app/api/transcripts');

    return ( 
        <div className="App">
        <h1>Karaoke App</h1>
        {isPending ? (
          <p>Loading transcripts...</p>
        ) : (
          <div className="transcript-list">
            <h2>Transcripts</h2>
            <ul>
              {data && data.map((transcript: Transcript )=> (
                <div className="song-privew">
                  <div className="song-card" onClick={() => handleSelectChange(transcript.id)}>
                    <p>{transcript.name}</p>
                  </div>
                </div>  
              ))}
            </ul>
          </div>
        )}
      </div>
     );
}
 
export default VideoList;