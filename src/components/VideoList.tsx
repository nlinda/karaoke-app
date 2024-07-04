import { Link } from 'react-router-dom';
import useFetch from '../Effects/useFetch';
import { Transcript } from '../Interfaces/Transcript';


  const VideoList: React.FC = () => {
    const { data, isPending, errorMessage} = useFetch<Transcript[]>('https://verbit-karaoke-assignment.vercel.app/api/transcripts');

    return ( 
        <div className="App">
        <h1>Karaoke App</h1>
        {errorMessage ?? (
          <p>{errorMessage}</p>
        )}
        {isPending ? (
          <p>Loading transcripts...</p>
        ) : (
          <div className="transcript-list">
            <h2>Transcripts</h2>
            <ul>
              {data && data.map((transcript: Transcript )=> (
                <div className="song-privew">
                  {/* <div className="song-card" onClick={() => handleSelectChange(transcript.id)}> */}
                  <Link to={"/transcript/" + transcript.id}><p>{transcript.name}</p></Link>
                  
                  </div>
                // </div>  
              ))}
            </ul>
          </div>
        )}
      </div>
     );
}
 
export default VideoList;