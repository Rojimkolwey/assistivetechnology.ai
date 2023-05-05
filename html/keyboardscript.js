const searchInput = document.querySelector(".search");
const resultsWrapper = document.querySelector(".search-results");
const buttonImgs = document.querySelectorAll(".button");

let allWords = [];

function readTextFile(file) {
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        allWords = rawFile.responseText;
      }
    }
  };
  rawFile.send(null);
}

readTextFile("./words.txt");

let allWordsArr = allWords.split("\n");

buttonImgs.forEach((buttonImg) => {
  buttonImg.addEventListener("click", () => {
    let results = [];
    let input = searchInput.value;
    if (input.length) {
      results = allWordsArr.filter((item) => {
        return item.toLowerCase().includes(input.toLowerCase());
      });
    }

    renderResults(results);
  });
});

searchInput.addEventListener("keyup", (e) => {
  let results = [];
  let input = searchInput.value;
  if (input.length) {
    results = allWordsArr.filter((item) => {
      return item.toLowerCase().includes(input.toLowerCase());
    });
  }

  renderResults(results);
});

function renderResults(results) {
  console.log("results", results);

  if (!results.length) {
    return resultsWrapper.classList.remove("show");
  }

  let resultsSubArr = [];

  if (results.length > 5) {
    console.log("creating subarrray", results);
    resultsSubArr = results.slice(0, 6);
  } else {
    resultsSubArr = results;
  }

  console.log(resultsSubArr);

  let content = resultsSubArr
    .map((item) => {
      return `<span class="word-result">${item}</span>`;
    })
    .join(" ");

  resultsWrapper.classList.add("show");
  resultsWrapper.innerHTML = content;
}
