const ytdl = require('ytdl-core');
const HttpsProxyAgent = require('https-proxy-agent');

const proxyUrl = 'http://45.119.133.218:3128'; // Replace with your proxy URL

export default async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'You must provide a URL' });
  }

  try {
    const proxyAgent = new HttpsProxyAgent(proxyUrl);
    const info = await ytdl.getInfo(url, { agent: proxyAgent });
    const formats = info.formats;

    const highResFormats = formats.filter(format => format.qualityLabel && format.qualityLabel.includes('p'));
    highResFormats.sort((a, b) => parseInt(b.qualityLabel) - parseInt(a.qualityLabel));

    const highestResVideoUrl = highResFormats[0].url;

    return res.status(200).json({ downloadUrl: highestResVideoUrl });
  } catch (error) {
    console.error('Error fetching video info:', error);
    return res.status(500).json({ error: 'Failed to fetch video info', details: error.message });
  }
};
