//// file downloader


const request = require('request');
const fs = require('fs');

// Fetch command line arguments
const [url, path] = process.argv.slice(2);

if (!url || !path) {
  console.error("Please provide both a URL and a file path.");
  process.exit(1);
}

request(url, (error, response, body) => {
  if (error) {
    console.error("Error fetching the URL:", error);
    return;
  }

  fs.writeFile(path, body, (err) => {
    if (err) {
      console.error("Error writing to the file:", err);
      return;
    }

    const bytesSaved = Buffer.from(body).length;
    console.log(`Downloaded and saved ${bytesSaved} bytes to ${path}`);
  });
});
