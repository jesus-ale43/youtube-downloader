import React, { useState, useRef } from 'react';
import VideoCard from '../components/VideoCard'

export default function Home() {
  const [URL, setURL] = useState('');

  return (
    <div>
      <div id="search-results">
        <VideoCard url={URL} />
      </div>
      <div className='pt-14 flex items-center justify-center'>
        <input
          className='w-1/3'
          type="search"
          placeholder="Enter Youtube video URL or ID"
          onChange={(e) => setURL(e.target.value)}
        />
      </div>
    </div>
  )

}


