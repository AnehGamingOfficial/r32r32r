// api/download.js
const ytdl = require('ytdl-core');

export default async (req, res) => {
 const ytdl = require('ytdl-core');
const HttpsProxyAgent = require('https-proxy-agent');

const proxy = 'http:/45.119.133.218:3128';  // Replace with your proxy details 
const agent = new HttpsProxyAgent(proxy);

const videoUrl = 'https://www.youtube.com/watch?v=s3uPtdHlc68';

ytdl.getInfo(videoUrl, { requestOptions: { agent } })
  .then(info => {
    const formats = info.formats;
    const highResFormats = formats.filter(format => format.qualityLabel && format.qualityLabel.includes('p'));
    highResFormats.sort((a, b) => parseInt(b.qualityLabel) - parseInt(a.qualityLabel));

    const highestResVideoUrl = highResFormats[0].url;
    console.log('Download URL for highest resolution:', highestResVideoUrl);
  })
  .catch(err => {
    console.error('Error fetching video info:', err);
  });


};
