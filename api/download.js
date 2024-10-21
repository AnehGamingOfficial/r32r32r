// api/download.js
const ytdl = require('ytdl-core');

export default async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'You must provide a URL' });
  }

  try {
    const info = await ytdl.getInfo(url);
    const formats = info.formats;

    const highResFormats = formats.filter(format => format.qualityLabel && format.qualityLabel.includes('p'));
    highResFormats.sort((a, b) => parseInt(b.qualityLabel) - parseInt(a.qualityLabel));

    const highestResVideoUrl = highResFormats[0].url;

    return res.status(200).json({ downloadUrl: highestResVideoUrl });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch video info' });
  }
};
