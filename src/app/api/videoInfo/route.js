import { NextResponse } from "next/server";
import ytdl from "ytdl-core";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const video = searchParams.get("video");

  if (!video)
    return NextResponse.json(
      { error: "No video provided" },
      { statusCode: 400 }
    );

  try {
    const { videoDetails, formats } = await ytdl.getInfo(video);

    return NextResponse.json({
      videoId: videoDetails.videoId,
      videoUrl: videoDetails.video_url,
      videoTitle: videoDetails.title,
      videoDescription: videoDetails.description,
      videoDuration: videoDetails.lengthSeconds,
      videoViews: videoDetails.viewCount,
      videoUploadDate: videoDetails.uploadDate,
      videoThumbnail: videoDetails.thumbnails[3],
      author: videoDetails.author,
      formatsDetails: formats.map(
        ({
          itag,
          hasVideo,
          hasAudio,
          audioBitrate,
          qualityLabel,
          container,
          url,
        }) => ({
          itag,
          hasVideo,
          hasAudio,
          audioBitrate: audioBitrate,
          quality: qualityLabel,
          format: container,
          url,
        })
      ),
    });
  } catch (error) {
    return NextResponse.json({ error: 'Video not found' }, { statusCode: 404 });
  }
}
