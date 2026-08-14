const IMAGES = {
  attic: "attic.png",
  beach: "beach.png",
  boat: "boat.png",
  cave: "cave.png",
  desk: "desk.png",
  fog: "fog.png",
  hall_clock: "hall_clock.png",
  house: "house.png",
  lighthouse: "lighthouse.png",
  shadow: "shadow.png",
  stars: "stars.png"
};

const storyData = {
  start: {
    text: "파도 소리가 잦아든 해변. 수평선 위에 차가운 주황빛 선이 그어져 있고, 먼발치에 목조 주택이 보인다.",
    image: IMAGES.beach,
    choices: [
      { text: "모래사장에 매여 있는 나룻배를 조사한다", next: "boat" },
      { text: "언덕 위 목조 주택으로 올라간다", next: "house" },
      { text: "해안 절벽 밑 동굴로 들어간다", next: "cave" }
    ]
  },
  boat: {
    text: "오래된 나룻배. 노와 밧줄이 가지런히 놓여있지만, 배 바닥엔 물이 조금 차올라 있다.",
    image: IMAGES.boat,
    choices: [
      { text: "배 옆의 그림자 시계 현상을 확인한다", next: "shadow" },
      { text: "해변으로 돌아간다", next: "start" }
    ]
  },
  shadow: {
    text: "모래에 꽂힌 막대와 긴 그림자, 그리고 손목시계. 멈춰버린 바깥 시간과 섬의 시간이 서로 어긋나 있다.",
    image: IMAGES.shadow,
    choices: [
      { text: "안개 속 수평선을 바라본다", next: "fog" },
      { text: "언덕 위 집으로 이동한다", next: "house" }
    ]
  },
  fog: {
    text: "짙은 안개 너머로 주황빛 수평선만이 이 섬을 고립시키듯 떠 있다. 더 이상 나아갈 수 없는 경계선이다.",
    image: IMAGES.fog,
    choices: [
      { text: "해변으로 발길을 돌린다", next: "start" }
    ]
  },
  house: {
    text: "고요한 목조 주택 전경. 창문 사이로 희미한 불빛이 새어나온다.",
    image: IMAGES.house,
    choices: [
      { text: "집 안으로 들어서 복도를 조사한다", next: "hall_clock" },
      { text: "해변으로 내려간다", next: "start" }
    ]
  },
  hall_clock: {
    text: "복도 끝에 서 있는 거대한 황동 괘종시계. 추와 톱니바퀴가 일정한 소리로 섬의 시각을 조율하고 있다.",
    image: IMAGES.hall_clock,
    choices: [
      { text: "서재 문을 열고 들어간다", next: "desk" },
      { text: "다락방으로 올라간다", next: "attic" }
    ]
  },
  desk: {
    text: "초록색 스탠드가 켜진 서재. 책상 위에는 정밀하게 그려진 항해 지도와 나침반, 해도들이 펼쳐져 있다.",
    image: IMAGES.desk,
    choices: [
      { text: "등대로 통하는 비밀 통로를 이용한다", next: "lighthouse" },
      { text: "복도로 나간다", next: "hall_clock" }
    ]
  },
  attic: {
    text: "다락방 안쪽. 먼지 쌓인 천체 망원경과 오르골이 놓여 있고, 창밖으로 초승달이 높게 떠 있다.",
    image: IMAGES.attic,
    choices: [
      { text: "망원경으로 밤하늘을 관측한다", next: "stars" },
      { text: "복도로 내려간다", next: "hall_clock" }
    ]
  },
  stars: {
    text: "망원경 렌즈 너머로 선명한 북두칠성과 밤하늘의 별자리들이 쏟아질 듯 펼쳐진다.",
    image: IMAGES.stars,
    choices: [
      { text: "별자리가 가리키는 방향(등대)으로 향한다", next: "lighthouse" },
      { text: "망원경에서 눈을 뗀다", next: "attic" }
    ]
  },
  lighthouse: {
    text: "등대 제어실. 거대한 프레넬 렌즈가 빛을 발하고 있고, 복잡한 전파 수신기와 게이지들이 멈춰 서 있다.",
    image: IMAGES.lighthouse,
    choices: [
      { text: "하부 동굴 뗏목 선착장으로 내려간다", next: "cave" },
      { text: "서재로 돌아간다", next: "desk" }
    ]
  },
  cave: {
    text: "어두운 바위 동굴 내부. 바다로 이어지는 동굴 입구에 뗏목 한 척이 떠 있다.",
    image: IMAGES.cave,
    choices: [
      { text: "뗏목을 타고 안개 너머 해안으로 나간다", next: "start" },
      { text: "등대로 올라간다", next: "lighthouse" }
    ]
  }
};

function startGame() {
  document.getElementById('title-screen').classList.add('hidden');
  renderScene('start');
}

function renderScene(stateKey) {
  const scene = storyData[stateKey];
  if (!scene) return;

  const imgEl = document.getElementById('illustration');
  const textEl = document.getElementById('story-text');
  const choicesEl = document.getElementById('choices');

  imgEl.src = scene.image;
  textEl.innerText = scene.text;
  choicesEl.innerHTML = '';

  scene.choices.forEach(choice => {
    const btn = document.createElement('button');
    btn.className = 'choice';
    btn.innerText = choice.text;
    btn.onclick = () => renderScene(choice.next);
    choicesEl.appendChild(btn);
  });
}
// 페이지가 로드되면 바로 첫 번째 장면(start)을 미리 세팅
renderScene('start');
