//Non terminal değişkenleri içerisinde tutar.
var variables = [];
var variableValues = [];
//Boş durum işaretlerini içerisinde tutar
var emptyStates = ["λ", "ε"];
//Üretilen rastgele kelimeleri içinde tutar
var words = [];
//Girilen terminalleri içinde tutar
var terminals = [];

//Grameri girdikten sonra kuralları gir buttonuna basılınca kuralları girmemizi sağlayan fonksiyon
function enterRules() {
  document.getElementById("result").value = null;

  //Eğer terminal ve non terminal değerler girilmemişse kullanıcıya uyarı verir.
  if (
    document.getElementById("V").value == "" ||
    document.getElementById("T").value == ""
  ) {
    alert("Lütfen V ve T verilerini giriniz.");
  } else {
    let variablesDiv = document.getElementById("variablesDiv");
    variables = document.getElementById("V").value.split(",");

    variablesDiv.innerHTML = null;

    //Girilen non terminal sayılarına ve isimlerine göre inputlar oluşturur.
    for (let i = 0; i < variables.length; i++) {
      let inputGroup = document.createElement("div");
      inputGroup.className = "input-group mb-2 w-50 ml-auto mr-auto";

      let prepend = document.createElement("div");
      prepend.className = "input-group-prepend";
      let span = document.createElement("span");
      span.className = "input-group-text";
      span.innerText = variables[i] + " -> ";
      prepend.appendChild(span);

      let input = document.createElement("input");
      input.className = "form-control input-sm";
      input.placeholder = "Tanım örn. ASA|A|λ";
      input.id = variables[i] + "Input";

      inputGroup.appendChild(prepend);
      inputGroup.appendChild(input);

      variablesDiv.appendChild(inputGroup);
    }

    document.getElementById("generateButton").disabled = false;
  }
}

//Tanım Üret butonuna basınca çalışan fonksiyon
function generateDescription() {
  words = [];
  let temp;
  let description = "L={";
  terminals = document.getElementById("T").value.split(",");

  //50 tane girilen kurallara uygun rastgele kelime oluşturur.
  for (let i = 0; i < 50; i++) {
    do {
      temp = generateWord();
    } while (temp == "");

    words.push(temp);
  }

  //Tek tek kurallar kontrol edilir be dil tanımı belirlenir.
  if (terminals.length == 1) {
    let mods = [2, 3, 5, 7];
    let mod;

    for (let i = 0; i < mods.length; i++) {
      if (calculateMod(mods[i])) {
        mod = mods[i];
        break;
      }
    }
    description += "w ∈ ∑* : mod" + mod + " = 0";
  } else if (isReverse()) {
    description += "w ∈ ∑* : wwᴿ";
  } else if (isEquals()) {
    description += "w ∈ ∑* : ";

    for (let i = 0; i < terminals.length; i++) {
      if (i == terminals.length - 1) {
        description += "n" + terminals[i] + "(w)";
      } else {
        description += "n" + terminals[i] + "(w)" + " = ";
      }
    }
  } else if (isNotEquals()) {
    description += "w ∈ ∑* : ";

    for (let i = 0; i < terminals.length; i++) {
      if (i == terminals.length - 1) {
        description += "n" + terminals[i] + "(w)";
      } else {
        description += "n" + terminals[i] + "(w)" + " ≠ ";
      }
    }
  } else {
    let countArray = numberOfTerminals();
    let startingChar = 109;
    for (let i = 0; i < countArray.length; i++) {
      if (countArray[i] == 1) {
        description +=
          terminals[i] + "^" + String.fromCharCode(startingChar) + " ";
      } else {
        description +=
          terminals[i] +
          "^" +
          countArray[i] +
          String.fromCharCode(startingChar) +
          " ";
      }
      startingChar += 1;
    }

    description += ": ";

    let booleanArray = getIncludesTerminal();
    startingChar = 109;
    for (let i = 0; i < booleanArray.length; i++) {
      if (booleanArray[i]) {
        description += String.fromCharCode(startingChar) + ">" + "0";
      } else {
        description += String.fromCharCode(startingChar) + "≥" + "0";
      }

      startingChar += 1;
    }
  }

  //Üretilen dil tanımı ekranda gösterilir.
  document.getElementById("result").value = description + "}";
}

//Kurallara uygun rastgele kelime oluşturan fonksiyon
function generateWord() {
  variableValues = [];
  let word = "";
  let startingPoint;

  //Girilen değerleri alır ve | karakterine göre ayırarak diziye atar.
  for (let i = 0; i < variables.length; i++) {
    let array = document
      .getElementById(variables[i] + "Input")
      .value.split("|");
    variableValues.push(array);
    if (variables[i] == "S") startingPoint = i;
  }

  //Diziden rastgele bir değer okumak için random index oluşturur.
  let randomIndex;
  do {
    randomIndex = Math.floor(
      Math.random() * variableValues[startingPoint].length
    );
    word = variableValues[startingPoint][randomIndex];
  } while (emptyStates.includes(variableValues[startingPoint][randomIndex]));

  let i = 0;
  //Hiç bir terminal olmayan değer kalmayana kadar ilerler
  //En son üretilen kelimeyi geri döndürür.
  while (isContainsNonTerminal(word)) {
    // Leftmost derivation ile kelimeyi oluşturur
    for (let i = 0; i < word.length; i++) {
      if (variables.includes(word.charAt(i))) {
        let terminalIndex = getVeriableIndex(word.charAt(i));
        let random = Math.floor(
          Math.random() * variableValues[terminalIndex].length
        );
        let randomWord = variableValues[terminalIndex][random];
        if (emptyStates.includes(randomWord)) {
          word = word.replace(word.charAt(i), "");
        } else {
          word = word.replace(word.charAt(i), randomWord);
        }
      }
    }
  }

  return word;
}
