import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ShieldCheck,
  Globe,
  Box,
  Maximize,
} from "lucide-react";
import VideoSrc from "../assets/Cinematic Delivery Experience.mp4";

const AboutVideo = () => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.4], [0.95, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]);

  // Video Controls Logic
  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(!isMuted);
  };

  return (
    <section
      ref={containerRef}
      className="relative bg-white py-16 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 mb-4"
            >
              <div className="h-[2px] w-8 bg-red-600"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600">
                Live Operations
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 italic uppercase tracking-tighter leading-none">
              The Future of <span className="text-red-600">Logistics</span>
            </h2>
          </div>
          <p className="text-slate-500 text-sm font-bold max-w-xs italic uppercase tracking-wider border-l-2 border-slate-100 pl-4">
            Experience the motion behind every successful delivery across the
            globe.
          </p>
        </div>

        {/* Cinematic Video Container */}
        <motion.div
          style={{ scale, opacity }}
          className="relative rounded-[2.5rem] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.2)] border border-slate-100 group bg-slate-100"
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-[500px] object-cover"
          >
            <source src={VideoSrc} type="video/mp4" />
          </video>

          {/* CUSTOM CONTROLS OVERLAY */}
          <div className="absolute inset-0 z-20 flex flex-col justify-between p-8 bg-black/10 group-hover:bg-black/5 transition-all">
            {/* Top Bar: Status */}
            <div className="flex justify-end">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-xl flex items-center gap-3">
                <span className="flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                </span>
                <span className="text-[10px] font-black text-white uppercase tracking-widest">
                  Ultra 4K Stream
                </span>
              </div>
            </div>

            {/* Middle: Big Play Button (Visible when paused) */}
            {!isPlaying && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                  <Play size={48} className="text-white fill-white ml-2" />
                </div>
              </motion.div>
            )}

            {/* Bottom Bar: Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Play/Pause */}
                <button
                  onClick={togglePlay}
                  className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-900 shadow-xl hover:bg-red-600 hover:text-white transition-all"
                >
                  {isPlaying ? (
                    <Pause size={20} />
                  ) : (
                    <Play size={20} fill="currentColor" />
                  )}
                </button>

                {/* Unmute/Mute */}
                <button
                  onClick={toggleMute}
                  className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-900 shadow-xl hover:bg-red-600 hover:text-white transition-all"
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
              </div>

              <div className="hidden md:block">
                <button className="px-6 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-black italic uppercase text-[10px] tracking-[0.2em] hover:bg-white/20 transition-all">
                  Expand Experience
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mt-12 border-t border-slate-100">
          {[
            {
              icon: <Globe size={24} />,
              title: "Global Link",
              desc: "Connecting 200+ cities instantly.",
            },
            {
              icon: <ShieldCheck size={24} />,
              title: "Safe Guard",
              desc: "End-to-end encrypted tracking.",
            },
            {
              icon: <Box size={24} />,
              title: "Smart Pick",
              desc: "Automated warehouse sorting.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 group hover:bg-slate-50 transition-colors border-r border-slate-100 last:border-r-0"
            >
              <div className="text-red-600 mb-4 transform group-hover:-translate-y-1 transition-transform">
                {item.icon}
              </div>
              <h4 className="text-slate-900 font-black italic uppercase text-sm mb-1">
                {item.title}
              </h4>
              <p className="text-slate-500 text-xs font-medium leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutVideo;
