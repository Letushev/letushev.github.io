const shuffleArray = array => {
  for (let i = array.length - 1; i > 0; i--) {
    const random = Math.floor(Math.random() * (i + 1));
    [array[i], array[random]] = [array[random], array[i]];
  }

  return array;
}

const urlParams = new URLSearchParams(window.location.search);
const subject = urlParams.get('s');

if (subject === 'algebra' || subject === 'geometry') {
  const questionEl = document.querySelector('.qa__question').children[0];
  const answerEl = document.querySelector('.qa__answer').children[0];
  const scroreEl = document.querySelector('.nav__score');
  const nextButton = document.querySelector('.nav__button--next');
  const prevButton = document.querySelector('.nav__button--prev');

  const qa = shuffleArray([...data[subject]]);
  let current = 0;
  let isAnswerVisible = false;

  document.querySelector('.nav__subject').textContent = 
    subject === 'algebra' ? 'Алгебра' : 'Геометрія';

  const formatText = string => {
    if (string.includes('images/')) {
      const img = document.createElement('img');
      img.setAttribute('alt', '');
      img.setAttribute('src', string);
      img.className = "qa__img";
      return img;
    }

    const lines = string.split(/\r?\n/);

    if (lines.length > 1) {
      const list = document.createElement('ul');
      for (let line of lines) {
        const item = document.createElement('li');
        item.textContent = line;
        list.appendChild(item);
      }
      return list;
    }

    const p = document.createElement('p');
    p.textContent = lines[0];
    return p;
  }

  const showAnswer = () => {
    answerEl.innerHTML = '';
    answerEl.appendChild(formatText(qa[current].a));
    isAnswerVisible = true;
  }

  const updateAnswer = () => {
    scroreEl.textContent = `${current + 1} / ${qa.length}`;
    questionEl.innerHTML = '';
    questionEl.appendChild(formatText(qa[current].q))

    prevButton.style.visibility = current === 0 ? 'hidden' : 'visible';
    nextButton.style.visibility = current === qa.length - 1 ? 'hidden' : 'visible';
    
    if (answerEl.innerHTML === '' || isAnswerVisible) {
      const img = document.createElement('img');
      img.setAttribute('src', 'images/question.svg');
      img.setAttribute('alt', '');
      img.className = 'qa__mark';
      img.addEventListener('click', () => {
        showAnswer();
      });

      answerEl.innerHTML = '';
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
