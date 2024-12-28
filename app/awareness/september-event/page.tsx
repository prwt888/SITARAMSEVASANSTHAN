
'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'


const VideoPlayer = ({ src }: { src: string }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [volume, setVolume] = useState(1)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showControls, setShowControls] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const progressRef = useRef<HTMLInputElement>(null)
  const controlsTimerRef = useRef<NodeJS.Timeout | null>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play()
        setIsPlaying(true)
      } else {
        videoRef.current.pause()
        setIsPlaying(false)
      }
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(videoRef.current.muted)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (videoRef.current) {
      videoRef.current.volume = newVolume
      setIsMuted(newVolume === 0)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value)
    setCurrentTime(time)
    if (videoRef.current) {
      videoRef.current.currentTime = time
    }
  }
  const resetControlsTimer = () => {
    if (controlsTimerRef.current) {
      clearTimeout(controlsTimerRef.current)
    }
    setShowControls(true)
    controlsTimerRef.current = setTimeout(() => {
      setShowControls(false)
    }, 3000)
  }

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.addEventListener('loadedmetadata', handleLoadedMetadata)
      video.addEventListener('timeupdate', handleTimeUpdate)
      video.addEventListener('ended', () => setIsPlaying(false))

      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata)
        video.removeEventListener('timeupdate', handleTimeUpdate)
        video.removeEventListener('ended', () => setIsPlaying(false))
      }
    }
  }, [])

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = volume
    }
  }, [volume])

  useEffect(() => {
    resetControlsTimer()
    return () => {
      if (controlsTimerRef.current) {
        clearTimeout(controlsTimerRef.current)
      }
    }
  }, [])

  return (
    <div
      className="relative w-full h-full"
      onMouseMove={resetControlsTimer}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <div className="absolute inset-0 cursor-pointer" onClick={togglePlay}>
        <video
          ref={videoRef}
          className="w-full h-auto  rounded"
          loop
          muted={isMuted}
          playsInline
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div
        className={`absolute bottom-0 left-0 right-0 bg-opacity-90 p-2 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
      >
        <input
          ref={progressRef}
          type="range"
          min={0}
          max={duration || 100}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-2 bg-white opacity-100 rounded-lg appearance-none cursor-pointer"
          style={{
            backgroundImage: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(currentTime / (duration || 1)) * 100}%, #ffffff ${(currentTime / (duration || 1)) * 100}%, #ffffff 100%)`,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat'
          }}
        />
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-2">
            <button
              className="md:text-white text-pink-900 md:text-2xl font-extrabold p-1 rounded-full md:hover:bg-black md:hover:bg-opacity-60"
              onClick={togglePlay}
            >
              {isPlaying ? <Pause size={36} /> : <Play size={36} />}
            </button>
            <button
              className="md:text-white text-pink-900 md:text-2xl font-extrabold p-1 rounded-full md:hover:bg-black md:hover:bg-opacity-60"
              onClick={toggleMute}
            >
              {isMuted ? <VolumeX size={36} /> : <Volume2 size={36} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 h-1 bg-blue-700 bg-opacity-80 rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <div className="md:text-white text-pink-900 md:text-xl text-base font-semibold">
            {formatTime(currentTime)}
          </div>
        </div>
      </div>
    </div>
  )
}

const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60)
  const seconds = Math.floor(time % 60)
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}
export default function SeptemberEventPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100  via-purple-400 to-pink-500">
      <Header />
      <main className="container mx-auto mt-8 px-4">
        <h1 className="text-4xl font-bold text-pink-800 mb-8 text-center">पुनः संस्था द्वारा संचालित कार्यक्रम 21 सितंबर 2024</h1>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <p className="md:text-xl text-base font-semibold text-gray-700 mb-4">
            21 सितंबर 2024 को पुनः संस्था द्वारा संचालित कार्यक्रम के अंतर्गत ब्रेस्ट कैंसर पेशेंट महिलाओं को ओरिजिनल सिलिकॉन ब्रेस्ट निःशुल्क डिस्ट्रीब्यूट किए गए।
          </p>
          <p className="md:text-xl text-base font-semibold text-gray-700 mb-4">
            इस पहल का उद्देश्य ब्रेस्ट कैंसर से पीड़ित महिलाओं के आत्मविश्वास और जीवन की गुणवत्ता में सुधार लाना है। हम अपने समुदाय के सदस्यों और दानदाताओं के समर्थन के लिए आभारी हैं, जिन्होंने इस कार्यक्रम को संभव बनाया।
          </p>
        </div>

        <h2 className="text-3xl font-bold text-pink-800 mb-6">वीडियो कवरेज</h2>
        <div className="grid grid-cols-1 gap-8">
          <div className="bg-white p-4 rounded-lg shadow-md h-[270px] md:h-[850px] sm:h-[375px]">
            <VideoPlayer src="/septvideo3.mp4" />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md h-[270px] md:h-[850px] sm:h-[375px]">
            <VideoPlayer src="/septvideo2.mp4" />
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md h-[270px] md:h-[850px] sm:h-[375px]">
            <VideoPlayer src="/septvideo.mp4" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}