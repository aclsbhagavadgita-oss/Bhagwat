const fs = require('fs');
const path = require('path');

const versesRaw = require('../raw-verses.json');
const transRaw = require('../raw-trans.json');

// Group translations by verse_id and pick the best English one
const transMap = new Map();

for (const t of transRaw) {
  if (t.lang === 'english') {
    if (!transMap.has(t.verse_id)) {
      transMap.set(t.verse_id, t);
    } else {
      // Prefer Swami Sivananda
      if (t.authorName && t.authorName.includes('Sivananda')) {
        transMap.set(t.verse_id, t);
      }
    }
  }
}

const chapters = {};

for (const v of versesRaw) {
  const ch = v.chapter_number;
  if (!chapters[ch]) chapters[ch] = [];

  // Parse word meanings if possible
  const wmStr = v.word_meanings || '';
  const wordMeanings = [];
  if (wmStr) {
    const parts = wmStr.split(';');
    for (const p of parts) {
      const [word, meaning] = p.split('—').map(s => s.trim());
      if (word && meaning) {
        wordMeanings.push({ word, meaning });
      }
    }
  }

  const t = transMap.get(v.verse_id) || {};
  let translation = t.description || "Translation coming soon...";
  // clean up translation artifacts
  translation = translation.replace(/<[^>]+>/g, '').trim();

  // Create verse object
  chapters[ch].push({
    chapter: ch,
    verse: v.verse_number,
    sanskrit: (v.text || '').trim(),
    transliteration: (v.transliteration || '').trim(),
    wordMeanings,
    translation,
    commentary: ""
  });
}

// Write the files
for (let i = 1; i <= 18; i++) {
  const data = chapters[i] || [];
  // Sort by verse number
  data.sort((a, b) => a.verse - b.verse);
  
  const filePath = path.join(__dirname, '..', 'data', 'verses', `chapter-${i}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`Wrote ${data.length} verses to chapter-${i}.json`);
}

// Write the search API data
const searchData = [];
const chMeta = require('../data/chapters.json');
const metaMap = {};
chMeta.forEach(c => metaMap[c.number] = c);

for (let i = 1; i <= 18; i++) {
  const data = chapters[i] || [];
  for (const v of data) {
    searchData.push({
      chapter: v.chapter,
      verse: v.verse,
      translation: v.translation,
      transliteration: v.transliteration,
      chapterTitle: metaMap[v.chapter]?.transliteratedTitle || `Chapter ${v.chapter}`
    });
  }
}

fs.writeFileSync(path.join(__dirname, '..', 'public', 'api', 'search-data.json'), JSON.stringify(searchData));
console.log("Wrote search-data.json");
