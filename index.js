async function main() {
  let wordList = await getWordList();

  let wordCount = wordList.length;
  let wordCountParagraf = createParagrafElement(
    `Txt File Word Count: ${wordCount}`
  );
  document.body.appendChild(wordCountParagraf);

  let longestWord = findLongestWord(wordList);
  let longestWordParagraf = createParagrafElement(
    `Longest Word: ${longestWord} - ${longestWord.length} character`
  );
  document.body.appendChild(longestWordParagraf);

  for (let i = 4; i < 8; i++) {
    let iCharacterWordCount = getXCharacterCount(i, wordList);
    let iCharacterWordCountParagraf = createParagrafElement(
      `${i} Character Word Count: ${iCharacterWordCount}`
    );
    document.body.appendChild(iCharacterWordCountParagraf);
  }

  let orderedList = createOrderedList(wordList);
  document.body.appendChild(orderedList);
}

async function getWordList() {
  let data = await fetch("./Resources/tr-word-list.txt");
  let text = await data.text();
  let lines = text.split("\n");
  return lines;
}

function getXCharacterCount(x, wordsArray) {
  let count = 0;
  for (const word of wordsArray) {
    if (word.length == x) {
      count++;
    }
  }
  return count;
}

function findLongestWord(wordsArray) {
  let longestWord = "";
  for (const word of wordsArray) {
    if (longestWord.length < word.length) {
      longestWord = word;
    }
  }
  return longestWord;
}

function createParagrafElement(text) {
  let wordCountParagraf = document.createElement("p");
  wordCountParagraf.textContent = text;
  wordCountParagraf.style.fontWeight = "bold";
  return wordCountParagraf;
}

function createOrderedList(wordsArray) {
  let orderedList = document.createElement("ol");
  for (let i = 0; i < wordsArray.length; i++) {
    let listItem = document.createElement("li");
    let word = wordsArray[i];
    listItem.textContent = word + " - " + word.length + " character";
    orderedList.appendChild(listItem);
  }
  return orderedList;
}

main();
