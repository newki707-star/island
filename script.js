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
// 🖼️ 이미지 파일명 연결 객체
const IMAGES = {
  boat: "",
  fog: "",
  beach: "",
  house: "",
  shadow: "",
  hall: "",
  clock: "",
  ending: ""
};

function renderFrame(key, label){
  const src = IMAGES[key];
  if(src && src.trim() !== ""){
    return `<div class="illust-frame"><img src="${src}" alt="${label}"></div>`;
  }
  return `
    <div class="illust-frame">
      <div class="frame-placeholder">
        🎨 <strong>${label}</strong><br>
        <span style="font-size:11px; opacity:0.75;">[ 세로 확장 프레임 ]</span>
      </div>
    </div>
  `;
}

let state = { memory: [] };

const T = (s) => `<span class="thought">${s}</span>`;
const N = (s) => `<span class="note-text">${s}</span>`;

function hasMemory(k){ return state.memory.includes(k); }
function addMemory(k){ if(!hasMemory(k)) state.memory.push(k); }

const scenes = {
  title: { render: () => `
      <div style="margin:auto 0;">
        <div class="eyebrow">Interactive Fiction</div>
        <h1 class="title">어스름의 섬</h1>
        <p class="subtitle">지친 일상을 뒤로하고 바다로 나선 어느 날,<br>시간이 정지해 버린 안개 섬에 도착했다.</p>
      </div>
      <button class="primary" onclick="go('p1')">이야기 시작하기</button>
  `},

  p1: { frame:["boat", "배"], text:()=>`반복되는 일상과 끝없는 서류 작업.
모든 것에 지쳐 무작정 작은 배를 빌려 바다로 나왔다.`, next:"p2" },
  
  p2: { frame:["boat", "배"], text:()=>`차가운 바람이 얼굴을 스쳤다.
얼마 만에 느껴보는 한적함인지 몰랐다.`, next:"p3" },

  p3: { frame:["fog", "안개"], text:()=>`얼마나 나아갔을까.
사방에서 짙은 우윳빛 안개가 순식간에 밀려왔다.`, next:"p4" },

  p4: { frame:["fog", "안개"], text:()=>`나침반 바늘은 방향을 잃고 뱅글뱅글 돌기만 했고, 
엔진 소리만 무겁게 울렸다.`, next:"p5" },

  p5: { frame:["beach", "해변"], text:()=>`둔탁한 마찰음과 함께 배가 작은 모래사장에 얹혀 섰다.
당황스럽기보단, 오랫동안 원했던 휴식처럼 느껴졌다.`, next:"p6" },

  p6: { frame:["beach", "해변"], text:()=>`"안개가 걷힐 때까지만... 쉬었다 가자."

가방에서 책을 꺼내 들고 모래사장에 앉았다.`, next:"p7" },

  p7: { frame:["shadow", "그림자"], text:()=>`한참 동안 책을 읽고 시계를 보았다.
손목시계의 초침은 째깍거리며 4시간이 지났음을 알리고 있었다.`, next:"p8" },

  p8: { frame:["shadow", "그림자"], text:()=>`하지만 하늘의 노을은 여전히 주황색이었다.
조금도 어두워지지 않았다.`, next:"p9" },

  p9: { frame:["shadow", "그림자"], text:()=>`이상해서 모래사장 위에 그어놓은 내 나뭇가지 그림자를 관찰했다.
단 1밀리미터도 움직이지 않았다.

${T("시간이... 전혀 흐르지 않고 있다.")}`, next:"p10" },

  p10: { frame:["boat", "배"], text:()=>`황급히 배로 돌아와 시동을 걸어보았다.
하지만 배는 마치 모래톱에 굳어버린 것처럼 미동조차 하지 않았다.`, next:"p11" },

  p11: { frame:["beach", "해변"], text:()=>`밀물도 썰물도 없었다.
파도 소리조차 들리지 않는 이상한 정적.

나는 섬 위쪽으로 발걸음을 옮기기 시작했다.`, next:"beach_choice" },

  beach_choice: { frame:["house", "저택"],
    text: (s)=>`언덕 위로 낡은 2층 목조 저택이 보인다.
해변 구석에는 파도에 쓸려온 낡은 가방이 파묻혀 있다.`,
    choices:[
      {label:"파묻힌 낡은 가방을 살펴본다", next:"find_bag"},
      {label:"언덕 위 목조 저택으로 올라간다", next:"house_front"}
    ]
  },

  find_bag: { frame:["beach", "해변"],
    text: (s)=>`가방 안에는 이 섬에서 살던 옛 어부의 정기 기록장이 들어있었다.

${N("...이 섬 주변의 여울은 묘하다. 북쪽 절벽의 암초는 오직 '북두칠성이 가리키는 방향'으로만 지나갈 수 있다. 그렇지 않으면 배가 깨진다...")}

${T("북두칠성 방향... 기억해 두자.")}`,
    next:"house_front",
    action: ()=>addMemory("북두칠성_방향")
  },

  house_front: { frame:["house", "저택"],
    text: (s)=>`저택 입구. 
우체통에 녹슨 열쇠 대신 오래된 저택 주인의 일상 일지 일부가 들어있다.`,
    next:"house_diary"
  },

  house_diary: { frame:["house", "저택"],
    text: (s)=>`${N("...주인은 매일 오후 3시만 되면 차를 들고 서재로 들어갔다. 그가 서재로 들어가면 늘 둔탁한 쾌종시계 소리가 울렸다. 그 시계와 서재는 무언가 연결되어 있는 게 분명하다...")}

${T("오후 3시... 그리고 서재.")}`,
    next:"hall",
    action: ()=>addMemory("3시_서재")
  },

  hall: { frame:["hall", "로비"],
    text: (s)=>`저택 로비는 차가운 먼지 냄새로 가득하다.
중앙에는 커다란 쾌종시계가 서 있다.

${T("어느 공간부터 둘러볼까?")}`,
    choices:(s)=>{
      const opts = [
        {label:"1층 서재 문을 열고 들어간다", next:"study"},
        {label:"2층 침실로 올라가 본다", next:"bedroom"}
      ];
      if(hasMemory("3시_서재")){
        opts.push({
          label:"쾌종시계 바늘을 '오후 3시'로 맞춰본다",
          next:"clock_success"
        });
      } else {
        opts.push({label:"쾌종시계를 이것저저 만져본다", next:"clock_fail"});
      }
      return opts;
    }
  },

  clock_fail: { frame:["clock", "쾌종시계"],
    text: (s)=>`태엽을 돌려보았지만 톱니바퀴만 무겁게 울릴 뿐 아무 일도 일어나지 않는다.
${T("이 시계에 관한 기록이나 습관이 어딘가에 적혀 있을 텐데...")}`,
    next:"hall"
  },

  study: { frame:["hall", "서재"],
    text: (s)=>`서재 안쪽 책상 위. 
오래된 항해 도면과 함께 연구원의 메모가 남겨져 있다.`,
    next:"study_detail"
  },

  study_detail: { frame:["hall", "서재"],
    text: (s)=>`${N("...등대의 거대한 광선은 그냥 쏘면 안개에 튕겨 나간다. 반드시 북동쪽 절벽의 반사판을 향해야만 안개 기둥이 뚫린다...")}

${T("등대를 쓸 일이 생긴다면 북동쪽 절벽을 기억해야겠어.")}`,
    next:"hall",
    action: ()=>addMemory("북동쪽_절벽")
  },

  bedroom: { frame:["hall", "침실"],
    text: (s)=>`2층 침실 탁자 위에서 **'등대용 고글'**과 라디오 노이즈에 관한 메모를 발견했다.`,
    next:"bedroom_detail"
  },

  bedroom_detail: { frame:["hall", "침실"],
    text: (s)=>`${N("...안개는 특정 주파수의 진동에 반응한다. 등대 음향기를 88.5MHz로 맞추었을 때 안개가 흔들리는 것을 확인했다...")}

${T("주파수 88.5MHz...")}`,
    next:"hall",
    action: ()=>addMemory("주파수_885")
  },

  clock_success: { frame:["clock", "쾌종시계"],
    text: (s)=>`일지에서 읽었던 주인의 습관대로 시계 바늘을 '오후 3시'에 맞추었다.

...탁.
둔탁한 소리와 함께 시계 뒤쪽 목재 벽이 슬라이드처럼 열리며 밑으로 내려가는 비밀 계단이 나타났다!`,
    next:"secret_path"
  },

  secret_path: { frame:["house", "비밀통로"],
    text: (s)=>`비밀 계단은 두 갈래로 나뉘어 있다.
위쪽은 섬 정상의 등대로, 아래쪽은 지하 포구로 연결되어 있다.`,
    choices:[
      {label:"섬 정상의 등대로 올라간다", next:"lighthouse"},
      {label:"지하 포구의 뗏목으로 내려간다", next:"raft"}
    ]
  },

  lighthouse: { frame:["hall", "등대"],
    text: (s)=>`등대 제어실. 
복잡한 거울 장치와 주파수 조절 레버가 먼지를 뒤덮은 채 서 있다.`,
    choices:(s)=>{
      const opts = [];
      if(hasMemory("북동쪽_절벽") && hasMemory("주파수_885")){
        opts.push({
          label:"[유추 적용] 주파수를 88.5MHz로 맞추고 북동쪽 절벽으로 광선을 쏜다",
          next:"ENDCALC", value:"true_light"
        });
      } else {
        opts.push({
          label:"무작정 등대 레버를 당겨 광선을 쏜다",
          next:"ENDCALC", value:"normal_light"
        });
      }
      opts.push({label:"비밀 통로로 돌아간다", next:"secret_path"});
      return opts;
    }
  },

  raft: { frame:["boat", "지하포구"],
    text: (s)=>`지하 포구에 작은 뗏목 하나가 정박해 있다.
바깥 안개 바다는 오싹할 정도로 조용하다.`,
    choices:(s)=>{
      const opts = [];
      if(hasMemory("북두칠성_방향")){
        opts.push({
          label:"[유추 적용] 북두칠성이 가리키는 방향을 따라 노를 젓는다",
          next:"ENDCALC", value:"true_escape"
        });
      } else {
        opts.push({
          label:"안개 속 바다로 무작정 노를 저어 나간다",
          next:"ENDCALC", value:"risk_escape"
        });
      }
      opts.push({label:"이 섬에 머물며 고요함을 누린다", next:"ENDCALC", value:"stay"});
      opts.push({label:"비밀 통로로 돌아간다", next:"secret_path"});
      return opts;
    }
  }
};

const endings = {
  ending_true_light:{ frame:["ending", "엔딩 S"], badge:"엔딩 S · 진실 해방", title:"다시 흐르는 시간",
    text:(s)=>`88.5MHz의 진동과 북동쪽 절벽을 향해 뻗어 나간 광선이 안개의 결을 산산조각 냈다.
멈춰있던 저택의 시계가 다시 째깍거리기 시작했고, 하늘의 노을이 넘어가며 밤하늘이 찾아왔다.
당신은 섬을 벗어나 진짜 당신의 삶으로 돌아왔다.`},

  ending_normal_light:{ frame:["ending", "엔딩 B"], badge:"엔딩 B · 구조", title:"안개 속의 불빛",
    text:(s)=>`등대 불빛이 안개를 조금 걷어내어 지나가던 어선이 섬을 발견하도록 도왔다.
완벽한 진실은 알지 못했지만, 당신은 무사히 집으로 돌아왔다.`},

  ending_true_escape:{ frame:["ending", "엔딩 A"], badge:"엔딩 A · 생환", title:"북두칠성의 길",
    text:(s)=>`기록에서 읽었던 북두칠성 방향을 따라 노를 저어 나갔다.
날카로운 암초들을 비켜 지나가자 짙은 안개가 거짓말처럼 걷혔다.
당신은 마침내 자유로운 바다로 돌아왔다.`},

  ending_risk_escape:{ frame:["ending", "엔딩 C"], badge:"엔딩 C · 난파", title:"어두운 바다",
    text:(s)=>`무작정 나선 바다에서 뗏목이 뾰족한 암초에 부딪혀 부서졌다.
다행히 헤엄쳐 돌아왔다면, 다시 탈출할 방법을 찾아야 한다.`},

  ending_stay:{ frame:["ending", "엔딩 D"], badge:"엔딩 D · 안식", title:"시간이 멈춘 방",
    text:(s)=>`피곤했던 세상으로 돌아가는 대신, 해가 지지 않는 이 정적 속에 머물기로 했다.
영원한 어스름 속에서 당신은 편안한 안식을 누린다.`}
};

function computeEnding(choice){
  if(choice === 'true_light') return 'ending_true_light';
  if(choice === 'normal_light') return 'ending_normal_light';
  if(choice === 'true_escape') return 'ending_true_escape';
  if(choice === 'risk_escape') return 'ending_risk_escape';
  return 'ending_stay';
}

function statusHtml(){
  return `<div class="status-bar">
    <span>🧭 정황 수집: <strong>${state.memory.length}개</strong></span>
    <span>어스름의 섬</span>
  </div>`;
}

function footerHtml(){
  return `<footer>― 📜 화면 또는 대사창을 터치하여 진행하세요 ―</footer>`;
}

let currentChoices = [];

function choose(index){
  const c = currentChoices[index];
  if(!c) return;

  if(c.action) c.action();

  if(c.next === 'ENDCALC'){
    renderEnding(computeEnding(c.value));
  } else {
    go(c.next);
  }
}

function go(sceneId){
  const panel = document.getElementById('panel');
  if(sceneId === 'p1'){
    state = { memory:[] };
  }

  const scene = scenes[sceneId];
  if(!scene) return;

  if(scene.action) scene.action();

  const frameHtml = scene.frame ? renderFrame(scene.frame[0], scene.frame[1]) : "";
  const text = typeof scene.text === 'function' ? scene.text(state) : scene.text;

  if(scene.next){
    panel.innerHTML = `
      <div class="fade-in">
        ${statusHtml()}
        ${frameHtml}
        <div class="dialog-box" onclick="go('${scene.next}')">
          <div class="scene-text">${text}</div>
          <div class="next-indicator">▼</div>
        </div>
        ${footerHtml()}
      </div>
    `;
    return;
  }

  const choiceList = typeof scene.choices === 'function' ? scene.choices(state) : scene.choices;
  currentChoices = choiceList;

  const choicesHtml = choiceList.map((c,i) =>
    `<button class="choice" onclick="choose(${i})">
      <span>${c.label}</span>
    </button>`
  ).join('');

  panel.innerHTML = `
    <div class="fade-in">
      ${statusHtml()}
      ${frameHtml}
      <div style="flex-grow:1; display:flex; flex-direction:column; justify-content:space-between;">
        <div class="dialog-box" style="min-height:75px; flex-grow:0; cursor:default;">
          <div class="scene-text">${text}</div>
        </div>
        <div class="choices">${choicesHtml}</div>
      </div>
      ${footerHtml()}
    </div>
  `;
}

function renderEnding(endId){
  const panel = document.getElementById('panel');
  const e = endings[endId];
  const frameHtml = e.frame ? renderFrame(e.frame[0], e.frame[1]) : "";
  const text = typeof e.text === 'function' ? e.text(state) : e.text;

  panel.innerHTML = `
    <div class="fade-in">
      <div>
        <div class="stamp">${e.badge}</div>
        <h1 class="ending-title">${e.title}</h1>
      </div>
      ${frameHtml}
      <div class="dialog-box" style="cursor:default;">
        <div class="scene-text">${text}</div>
      </div>
      <button class="primary" onclick="go('title')">다시 처음부터 보기</button>
      ${footerHtml()}
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  const panel = document.getElementById('panel');
  panel.innerHTML = `<div class="fade-in">${scenes.title.render()}${footerHtml()}</div>`;
});
