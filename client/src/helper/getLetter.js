export default function(usedLetters, letters) {
  if (usedLetters.length < letters.length) {
    for (let item of letters) {
      if (!usedLetters.find(element => element === item)) {
        return item;
      }
    }
  } else {
    for (let firstItem of letters) {
      for (let secoundItem of letters) {
        let doubleLetter = `${firstItem}${secoundItem}`;
        if (!usedLetters.find(element => element === doubleLetter)) {
          return doubleLetter;
        }
      }
    }
  }
};
