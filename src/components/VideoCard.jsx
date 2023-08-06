//I will not refactor this

import Link from "next/link";
import Image from "next/image";

import { useState } from "react";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function VideoCard({ submittedVideo }) {
  const { data, error } = useSWR(
    `/api/videoInfo?video=${submittedVideo}`,
    fetcher,
  );
  const [selectedOption, setSelectedOption] = useState();

  if (error)
    return <h1 className="text-center mb-10">An error has occurred.</h1>;
  if (!data) return <h1 className="text-center mb-10">Loading...</h1>;
  if (data.error === "No video provided")
    return <h1 className="text-center mb-10">Where is the URL?</h1>;
  if (data.error === "Video not found")
    return (
      <h1 className="text-center mb-10">
        Sorry, I couldn&apos;t find the video!
      </h1>
    );

  const VerifiedBadge = () => {
    return (
      <div className="p-0 pl-1 mb-[1px] flex-none">
        <Image
          src="/verified-checkmark.svg"
          alt="Verified"
          width={14}
          height={14}
        />
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center justify-center mb-10">
      <div className="flex sm:flex-row flex-col gap-3 sm:max-w-2xl max-w-xs">
        <div className="relative min-w-fit">
          <Link target="_blank" href={data.videoUrl}>
            <div className="h-4 inline-flex items-center flex-row font-medium py-[3px] px-1 bottom-[6px] right-[6px] absolute rounded-[4px] text-xs bg-[#000000cc] z-10">
              {data.videoDuration}
            </div>
            <img
              src={data.videoThumbnail.url}
              className="rounded-2xl"
              alt="thumbnail"
            />
          </Link>
        </div>
        <div className="flex gap-1 flex-col">
          <Link target="_blank" href={data.videoUrl} passHref>
            <h3 className="max-w-2xl text-lg">{data.videoTitle}</h3>
            <div className="text-xs text-[#AAAAAA]">
              <div>
                <div>
                  <span className="after:content-['•'] after:mx-1">
                    {data.videoViews} views
                  </span>
                  <span>{data.videoUploadDate}</span>
                </div>
              </div>
            </div>
          </Link>
          <div className="min-w-fit my-2">
            <Link
              target="_blank"
              href={data.author.channel_url}
              passHref
              className="flex items-center gap-2 text-xs text-[#AAAAAA]"
            >
              <img
                src={data.author.thumbnails[0].url}
                alt="Channel Image"
                className="w-6 rounded-full"
              />
              <div className="flex">
                <span className="hover:text-white">{data.author.name}</span>
                {data.author.verified ? <VerifiedBadge /> : null}
              </div>
            </Link>
          </div>
          <Link target="_blank" href={data.videoUrl} passHref>
            <div className="max-w-2xl line-clamp-2 text-xs text-[#AAAAAA]">
              <p>
                {data.videoDescription.length >= 77
                  ? `${data.videoDescription.slice(0, 77)}...`
                  : data.videoDescription}
              </p>
            </div>
          </Link>
          <div className="h-8 flex flex-row">
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="w-1/2 appearance-none bg-[#f1f1f1] text-black font-semibold rounded-full text-sm text-center"
            >
              {data.formatsDetails.map((format, index) => {
                console.log(index);
                return (
                  <option key={index} value={format.itag}>
                    {format.quality == null
                      ? `${format.audioBitrate}kbps`
                      : format.quality}{" "}
                    {format.hasAudio ? "" : "(No Audio)"}
                  </option>
                );
              })}
            </select>

            <Link
              target="_blank"
              className="flex"
              href={
                selectedOption
                  ? data.formatsDetails.filter(
                      (format) => format.itag == selectedOption,
                    )[0].url
                  : "#"
              }
              passHref
            >
              <button
                disabled={selectedOption ? false : true}
                className="disabled:cursor-not-allowed disabled:text-gray-300 px-5 ml-2 bg-[#272727] font-medium rounded-full text-sm text-center"
              >
                Download
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
