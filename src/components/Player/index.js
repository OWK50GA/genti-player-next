import { useState, useRef, useEffect, forwardRef } from 'react'
import Slider from './component/slider/Slider'
import ControlPanel from './component/controls/ControlPanel'


function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}


const App = ({ episode,
  episodes,
  currentEpisodeIndex,
  setCurrentEpisodeIndex }) => {

  const [percentage, setPercentage] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [audioUrl, setAudioUrl] = useState(episode)
  const audioRef = useRef()


  const play = () => {
    const audio = audioRef.current
    // audio.volume = 0.1
    if (!isPlaying) {

      setIsPlaying(true)
      audio.play()
    }

    if (isPlaying) {
      setIsPlaying(false)
      audio.pause()
    }
  }

  const onChange = (e) => {
    const audio = audioRef.current
    audio.currentTime = (audio.duration / 100) * e.target.value
    setPercentage(e.target.value)
    // play()
  }




  const forward = () => {
    const audio = audioRef.current
    // audio.volume = 0.1
    audio.currentTime += 20;
    audio.play()
    setIsPlaying(true)

  }

  const backward = () => {
    const audio = audioRef.current
    // audio.volume = 0.1
    audio.currentTime -= 20;
    audio.play()
    setIsPlaying(true)

  }

  const getCurrDuration = (e) => {
    const percent = ((e.currentTarget.currentTime / e.currentTarget.duration) * 100).toFixed(2)
    const time = e.currentTarget.currentTime

    setPercentage(+percent)
    setCurrentTime(time.toFixed(2))
  }
  const previousEpisode = usePrevious(audioUrl)

  useEffect(() => {
    if (previousEpisode !== episode) {
      const audio = audioRef.current
      audio.pause();
      audio.currentTime = 0;
      setAudioUrl(episode)


      if (isPlaying) {
        setIsPlaying(false)
        const progressBar = document.querySelector('.progress-bar-cover')
        const thumb = document.querySelector('.thumb')
        progressBar.style.width = 0
        thumb.style.left = 0
        thumb.style.marginLeft = 0
        // audio.pause()
      }

    } else {
    }
  }, [episode])

  useEffect(() => {
    var lastEvent;
    var heldKeys = {};

    window.onkeydown = function (e) {
      if (lastEvent && lastEvent.keyCode == e.key) {
        return;
      }
      lastEvent = e;
      heldKeys[e.key] = true;
      if (e.key === 'ArrowLeft') backward()
      if (e.key === 'ArrowRight') forward()
      if (e.key === " ") {
        const audio = audioRef.current
        if (audio.paused) {
          audio.play()
          setIsPlaying(true)

        } else {
          audio.pause()
          setIsPlaying(false)

        }

      }
    };

    window.onkeyup = function (event) {
      lastEvent = null;
      delete heldKeys[event.key];
    }



  }, [])


  useEffect(() => {
    const audio = audioRef.current
    audio.onended = () => {
      if (currentEpisodeIndex < episodes.length - 1) {
        setCurrentEpisodeIndex(currentEpisodeIndex + 1);

      } else {
        // All episodes have been played
        alert('// All episodes have been played')
        // setCurrentEpisodeIndex(0);

      }
    };
    audio.play()
  }, [currentEpisodeIndex, episodes])


  useEffect(() => {
    const audio = audioRef.current;
    if (currentEpisodeIndex > 0) {
      audio.play()
      setIsPlaying(true)
    }
  }, [episode]);

  return (
    <div className='app-container'>
      <Slider percentage={percentage} onChange={onChange} />
      <audio
        ref={audioRef}
        onTimeUpdate={getCurrDuration}
        onLoadedData={(e) => {
          setDuration(e.currentTarget.duration.toFixed(2))
        }}
        src={episode}
      ></audio>
      {
        episode &&
        <ControlPanel
          play={play}
          isPlaying={isPlaying}
          duration={duration}
          currentTime={currentTime}
          forward={forward}
          backward={backward}
        />
      }

    </div>
  )
}

export default App
