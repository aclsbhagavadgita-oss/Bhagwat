const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'chapters.json');
const rawData = fs.readFileSync(filePath, 'utf8');
const chapters = JSON.parse(rawData);

const modifiedChapters = chapters.map(ch => {
  const newCh = { ...ch };
  delete newCh.verseCount;
  newCh.content = `This is the detailed blog post content for Chapter ${ch.number}. You can write extensive articles here detailing the profound wisdom of the Bhagavad Gita.\n\n## Section 1\nHere is a subsection discussing the themes of ${ch.transliteratedTitle}.`;
  newCh.published = true;
  return newCh;
});

fs.writeFileSync(filePath, JSON.stringify(modifiedChapters, null, 2));
console.log("Updated chapters.json");
