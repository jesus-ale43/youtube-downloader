"use client";

import { useState } from "react";
import VideoCard from "@/components/VideoCard";

export default function Home() {
  const [submittedVideo, setSubmittedVideo] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmittedVideo(event.target.video.value);
  };

  return (
    <section class="w-full h-screen to-gree flex flex-col items-center md:justify-center">
      <div className="container px-5 pt-8 md:pt-0 md:pb-0 max-w-screen-md">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl uppercase tracking-wide font-bold mb-1">
            Youtube Video Downloader
          </h1>
          <h2 className="text-base md:text-lg text-zinc-300">
            Just paste your link
          </h2>
        </div>
        {submittedVideo && <VideoCard submittedVideo={submittedVideo} />}
        <form onSubmit={handleSubmit} className="w-full flex flex-col md:flex-row">
          <input
            id="video"
            type="text"
            placeholder="e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            className="p-4 mb-3 md:mb-0 md:mr-3 flex-1 text-gray-700 rounded"
            required
          />
          <button
            type="submit"
            className="py-4 px-6 bg-neutral-800 hover:bg-neutral-700 text-base text-neutral-50 font-medium tracking-wider transition-all rounded"
          >
            Download
          </button>
        </form>
      </div>
    </section>
  );
}
