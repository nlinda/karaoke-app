import { Link } from 'react-router-dom';
import { Transcript } from '../Interfaces/Transcript';
import { useQuery } from 'react-query';
import { retrieveTranscriptList } from '../api/verbit-api';
import ErrorPage from './ErrorPage';


  const VideoList: React.FC = () => {
    
      const {
        data,
        error,
        isLoading,
      } = useQuery("transcriptData", retrieveTranscriptList);
      
      if (error) return <ErrorPage message={JSON.stringify(error)}/>;   
      if (isLoading) return <div>Fetching Transcripts...</div>;
     
    return ( 
        <div className="App">
        <h1>Karaoke App</h1>
        {(
          <div className="transcript-list">
            <h2>Transcripts</h2>
            <ul>
              {data && data.map((transcript: Transcript )=> (
                <div key={transcript.id} className="song-privew">
                  {/* <div className="song-card" onClick={() => handleSelectChange(transcript.id)}> */}
                  <li><Link to={"/transcript/" + transcript.id}><p>{transcript.name}</p></Link></li>
                </div>
              ))}
            </ul>
          </div>
        )}
      </div>
     );
}
 
export default VideoList;