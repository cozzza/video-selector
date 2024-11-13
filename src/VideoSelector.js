import { useState, useRef, useEffect } from 'react';
import { frames, audios } from './arrays';
import './styles.css';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

export const VideoSelector = () => {
  const [audioList, setAudioList] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const audioRef = useRef(new Audio());

  const handleAddToQueue = (index) => {
    setAudioList((prev) => [...prev, index]);
  };

  const playAudioQueue = () => {
    if (audioList.length > 0 && currentAudioIndex < audioList.length) {
      const audioKey = Object.keys(audios)[audioList[currentAudioIndex]];
      audioRef.current.src = audios[audioKey];
      audioRef.current.play();
      setIsPlaying(true);

      audioRef.current.onended = () => {
        setIsPlaying(false);
        setCurrentAudioIndex((prevIndex) => prevIndex + 1);
      };
    } else {
      setIsPlaying(false);
      setCurrentAudioIndex(0);
    }
  };
  
  useEffect(() => {
    if (!isPlaying && currentAudioIndex < audioList.length) {
      playAudioQueue();
    }
  }, [currentAudioIndex, audioList, isPlaying]);

  return (
    <div>
      <div>
        <h1 style={{ color: 'white' }}>Un cuerpo expuesto</h1>
        <h3 style={{ color: 'white' }}>Selecciona un sonido</h3>
      </div>
      <div className="video-grid">
        {frames.map((frame, index) => (
          <div key={index} className="video-card" onClick={() => handleAddToQueue(index)}>
            <img src={frame} alt={`Frame ${index}`} />
            <div >
            {audioList[currentAudioIndex] === index && isPlaying ? (
              <div className="equalizer-bar-container">
                <div className="equalizer-bar"></div>
                <div className="equalizer-bar"></div>
                <div className="equalizer-bar"></div>
              </div>
              ) : (
                <PlayCircleOutlineIcon fontSize="large" className="icon-overlay" /> )} 

            {/* */}


            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
