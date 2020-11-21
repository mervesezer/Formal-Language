//Bu JavaScript Dosyasında kuralları kontrol etmemizi sağlayan operasyonların fonksiyonları bulunuyor

//Girdiğimiz terminalleri tek tek gezerek tüm kelimelerde o terminalin olup olmadığını kontrol eder
function getIncludesTerminal() {
  let booleanArray = [];

  for (let i = 0; i < terminals.length; i++) {
    booleanArray.push(isIncludes(terminals[i]));
  }

  return booleanArray;
}

//Parametre olarak gönderilen terminalin tüm üretilen kelimeler içinde olup olmadığına bakar
function isIncludes(terminal) {
  for (let i = 0; i < words.length; i++) {
    if (words[i].includes(terminal) == false) {
      return false;
    }
  }

  return true;
}

//Parametre olarak gönderilen stringi ters çevirir
function reverseString(string) {
  let reversed = "";
  for (let i = string.length - 1; i >= 0; i--) {
    reversed += string.charAt(i);
  }
  return reversed;
}

//Parametre olarak gönderilen değişkenin değişkenler dizinde kaçıncı indekste olduğunu gösterir
function getVeriableIndex(variable) {
  for (let i = 0; i < variables.length; i++) {
    if (variables[i] == variable) return i;
  }
}

//Parametre olarak gönderilen kelimenin içerisinde non terminal bir değişken olup olmadığını döndürür
function isContainsNonTerminal(word) {
  for (let i = 0; i < variables.length; i++) {
    if (word.includes(variables[i])) return true;
  }
  return false;
}

//Parametre olarak gönderilen terminalin terminaller dizisinde kaçıncı indekste olduğunu gösterir
function getTerminalIndex(terminal) {
  for (let i = 0; i < terminals.length; i++) {
    if (terminals[i] == terminal) return i;
  }
}

//Üretilen tüm kelimeleri kontrol ederek tüm kelimelerin reverse kuralına uygun olup olmadığına bakar
//Kelimenin ilk yarısı ve 2. yarısını alarak 2. yarısının tersinin ilk yarısına eşit olup olmadığına bakar
function isReverse() {
  for (let i = 0; i < words.length; i++) {
    if (words[i].length % 2 != 0) return false;

    let firstHalf = words[i].substring(0, words[i].length / 2);
    let secondHalf = words[i].substring(words[i].length / 2, words[i].length);
    let reversed = reverseString(firstHalf);

    if (secondHalf != reversed) return false;
  }

  return true;
}

//Tüm kelimeleri kontrol ederek terminal sayılarının bir birine eşit mi diye bakar.
function isEquals() {
  let terminalCountArray = new Array(terminals.length);

  for (let i = 0; i < words.length; i++) {
    for (let i = 0; i < terminalCountArray.length; i++)
      terminalCountArray[i] = 0;

    for (let j = 0; j < words[i].length; j++) {
      terminalCountArray[getTerminalIndex(words[i][j])] += 1;
    }

    for (let k = 1; k < terminalCountArray.length; k++) {
      if (terminalCountArray[0] != terminalCountArray[k]) {
        return false;
      }
    }
  }

  return true;
}

//Tüm kelimeleri kontrol ederek terminal sayılarının bir birine eşit değil mi diye bakar.
function isNotEquals() {
  let terminalCountArray = new Array(terminals.length);

  for (let i = 0; i < words.length; i++) {
    for (let i = 0; i < terminalCountArray.length; i++)
      terminalCountArray[i] = 0;

    for (let j = 0; j < words[i].length; j++) {
      terminalCountArray[getTerminalIndex(words[i][j])] += 1;
    }

    for (let k = 1; k < terminalCountArray.length; k++) {
      if (terminalCountArray[0] == terminalCountArray[k]) {
        return false;
      }
    }
  }

  return true;
}

//Tüm kelimeleri kontrol ederek kelimenin uzunluğu parametre olarak gönderilen mod değişkenine bölümünden kalan 0 mı diye bakar
function calculateMod(mod) {
  for (let i = 0; i < words.length; i++) {
    if (words[i].length % mod != 0) return false;
  }

  return true;
}

//Tüm terminallere bakarak kelimelerin içerisinde bu terminal sadece çift sayıda mı olabilir yoksa hem çift hem tek olabilir mi diye kontrol eder
function numberOfTerminals() {
  let countArray = new Array(terminals.length);
  for (let i = 0; i < countArray.length; i++) countArray[i] = 0;

  for (let i = 0; i < terminals.length; i++) {
    if (isEven(terminals[i])) {
      countArray[i] = 2;
    } else {
      countArray[i] = 1;
    }
  }

  return countArray;
}

//Parametre olarak gönderilen terminalin tüm kelimeler kontrol edilerek sadece çift sayıda mı olduğuna bakar.
function isEven(terminal) {
  let count = 0;
  for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < words[i].length; j++) {
      if (words[i][j] == terminal) count++;
    }

    if (count % 2 != 0) return false;
  }

  return true;
}

//Parametre olarak gönderilen terminalin tüm kelimeler kontrol edilerek sadece tek sayıda mı olduğuna bakar.
function isOdd(terminal) {
  let count = 0;
  for (let i = 0; i < words.length; i++) {
    if (words[i].includes(terminal)) {
      for (let j = 0; j < words[i].length; j++) {
        if (words[i][j] == terminal) count++;
      }

      if (count % 2 == 0) return false;
    }
  }

  return true;
}
