const ytdl = require('ytdl-core');

const videoUrl = 'https://www.youtube.com/watch?v=s3uPtdHlc68'; // Replace with your YouTube video URL

ytdl.getInfo(videoUrl)
  .then(info => {
    // Get the formats available
    const formats = info.formats;

    // Filter for high-resolution formats
    const highResFormats = formats.filter(format => format.qualityLabel && format.qualityLabel.includes('p'));

    // Sort formats by resolution (highest first)
    highResFormats.sort((a, b) => {
      const aQuality = parseInt(a.qualityLabel);
      const bQuality = parseInt(b.qualityLabel);
      return bQuality - aQuality;
    });

    // Get the URL for the highest resolution format
    const highestResVideoUrl = highResFormats[0].url;

    console.log('Download URL for highest resolution:', highestResVideoUrl);
  })
  .catch(err => {
    console.error('Error fetching video info:', err);
  });
