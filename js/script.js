// スライダーの初期化
let currentLong = 0;
let currentShort = 0;

const longWorks = document.querySelectorAll('#long-works .slide');
const shortWorks = document.querySelectorAll('#short-works .slide');

const longCurrent = document.getElementById('long-current');
const shortCurrent = document.getElementById('short-current');

// 長編作品のスライド前後切替
document.getElementById('prev-long').addEventListener('click', function() {
  if (currentLong > 0) {
    currentLong--;
    updateSlider('long');
  }
});

document.getElementById('next-long').addEventListener('click', function() {
  if (currentLong < longWorks.length - 1) {
    currentLong++;
    updateSlider('long');
  }
});

// 短編作品のスライド前後切替
document.getElementById('prev-short').addEventListener('click', function() {
  if (currentShort > 0) {
    currentShort--;
    updateSlider('short');
  }
});

document.getElementById('next-short').addEventListener('click', function() {
  if (currentShort < shortWorks.length - 1) {
    currentShort++;
    updateSlider('short');
  }
});

// スライドを更新
function updateSlider(type) {
  const current = type === 'long' ? currentLong : currentShort;
  const works = type === 'long' ? longWorks : shortWorks;
  const currentLabel = type === 'long' ? longCurrent : shortCurrent;

  works.forEach((slide, index) => {
    slide.style.transform = `translateX(-${current * 100}%)`;
  });

  currentLabel.textContent = `${current + 1}/${works.length}`;
}

// 初期表示を設定
updateSlider('long');
updateSlider('short');
