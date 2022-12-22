import ytdl from "ytdl-core";

export const config = {
  api: {
    responseLimit: false,
  },
};

export default async function handler(req, res) {
  if (!req.query.url) return res.status(400).json({ error: 'No url' })

  try {
    var video = await ytdl.getInfo(req.query.url)
  } catch (error) {
    return res.status(404).json({ error: 'Video not found' })
  }

  //console.log(video.videoDetails.thumbnails[4])
  res.status(200).json({
    videoId: video.videoDetails.videoId,
    videoUrl: video.videoDetails.video_url,
    videoTitle: video.videoDetails.title,
    videoDescription: video.videoDetails.description,
    videoDuration: video.videoDetails.lengthSeconds,
    videoViews: video.videoDetails.viewCount,
    videoUploadDate: video.videoDetails.uploadDate,
    videoThumbnail: video.videoDetails.thumbnails[3],
    author: video.videoDetails.author,
    formatsDetails:
      video.formats.map(
        ({ itag, hasVideo, hasAudio, audioBitrate, qualityLabel, container, url }) => ({
          itag: itag,
          hasVideo: hasVideo,
          hasAudio: hasAudio,
          audioBitrate: audioBitrate,
          quality: qualityLabel,
          format: container,
          url: url
        })
      ),
  });

};
