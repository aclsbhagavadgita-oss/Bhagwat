const fs = require('fs');
const https = require('https');

async function downloadGita() {
  console.log("Fetching verse data...");
  const verseUrl = 'https://raw.githubusercontent.com/praneshp1org/Bhagavad-Gita-JSON-data/main/verse.json';
  
  try {
    const response = await fetch(verseUrl);
    if (!response.ok) {
      console.log("Failed to fetch verse.json:", response.statusText);
      return;
    }
    const text = await response.text();
    console.log("Success! Length:", text.length);
    fs.writeFileSync('raw-verses.json', text);
    
    // Also try to fetch translation
    const transUrl = 'https://raw.githubusercontent.com/praneshp1org/Bhagavad-Gita-JSON-data/main/translation.json';
    const transRes = await fetch(transUrl);
    if (transRes.ok) {
       fs.writeFileSync('raw-trans.json', await transRes.text());
       console.log("Saved translations too.");
    }
  } catch (err) {
    console.error("Error:", err);
  }
}

downloadGita();
