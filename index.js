const urlParams = new URLSearchParams(window.location.search);
const subject = urlParams.get('s');

if (subject === 'algebra' || subject === 'geometry') {
  const questionEl = document.querySelector('.qa__question').children[0];
  const answerEl = document.querySelector('.qa__answer').children[0];
  const scroreEl = document.querySelector('.nav__score');
  const nextButton = document.querySelector('.nav__button--next');
  const prevButton = document.querySelector('.nav__button--prev');

  const qa = data[subject];
  let current = 0;
  let isAnswerVisible = false;

  const showAnswer = () => {
    answerEl.innerHTML = qa[current].a;
    isAnswerVisible = true;
  }

  const updateAnswer = () => {
    scroreEl.textContent = `${current + 1} / ${qa.length}`;
    questionEl.innerHTML = qa[current].q;

    prevButton.style.visibility = current === 0 ? 'hidden' : 'visible';
    nextButton.style.visibility = current === qa.length - 1 ? 'hidden' : 'visible';
    
    if (answerEl.innerHTML === '' || isAnswerVisible) {
      const img = document.createElement('img');
      img.setAttribute('src', 'images/question.svg');
      img.setAttribute('alt', '');
      img.addEventListener('click', () => {
        showAnswer();
      });

      answerEl.textContent = "";
      answerEl.appendChild(img);
      isAnswerVisible = false;
    }
  };

  nextButton.addEventListener('click', () => {
    current++;
    updateAnswer();
  });

  prevButton.addEventListener('click', () => {
    current--;
    updateAnswer();
  });

  updateAnswer();
} else {
  window.location.href = 'index.html';
}
