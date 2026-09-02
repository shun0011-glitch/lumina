// ========================================
// 1. HTML要素を取得
// ========================================

const fadeElements = document.querySelectorAll(".fade-in");

const menuButton = document.querySelector(".menu-button");
const navMenu = document.querySelector(".nav-menu");

const openFormButton = document.querySelector("#open-form");
const reservationForm = document.querySelector("#reservation-form");

const form = document.querySelector("#reservationForm");
const formMessage = document.querySelector("#form-message");
const reservationPreview = document.querySelector("#reservation-preview");

const menuList = document.querySelector("#menu-list");
const addMenuButton = document.querySelector("#add-menu");


// ========================================
// 2. メニューデータ
// ========================================

const menus = [
  {
    name: "Cut",
    description: "骨格や髪質に合わせた似合わせカット",
    price: "¥5,500"
  },
  {
    name: "Color",
    description: "自然な透明感を引き出すカラー",
    price: "¥7,700〜"
  },
  {
    name: "Hair Treatment",
    description: "髪本来の美しさを引き出すケア",
    price: "¥4,400〜"
  }
];

const additionalMenus = [
  {
    name: "Head Spa",
    description: "頭皮と髪を整えるリラクゼーションケア",
    price: "¥6,600"
  },
  {
    name: "前髪カット",
    description: "顔立ちに合わせた前髪デザイン",
    price: "¥1,100"
  },
  {
    name: "髪質改善",
    description: "まとまりとツヤを引き出すスペシャルケア",
    price: "¥8,800〜"
  }
];

let additionalMenuIndex = 0;


// ========================================
// 3. 関数
// ========================================


// ----- フェードイン -----

function checkFadeIn() {
  fadeElements.forEach((element) => {
    const position = element.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (position < windowHeight - 100) {
      element.classList.add("show");
    }
  });
}


// ----- メニューカードを作る -----

function createMenuCard(menu) {
  const card = document.createElement("div");

  card.classList.add("menu-card");

  card.innerHTML = `
    <h3>${menu.name}</h3>
    <p>${menu.description}</p>
    <strong>${menu.price}</strong>
    <button class="delete-menu">削除</button>
  `;

  menuList.appendChild(card);

  const deleteButton = card.querySelector(".delete-menu");

  deleteButton.addEventListener("click", () => {
    card.remove();
  });
}


// ----- 予約確認画面を表示 -----

function showReservationPreview(name, email, date, message) {
  reservationPreview.classList.add("show");

  reservationPreview.innerHTML = `
    <h3>予約内容をご確認ください</h3>

    <p>お名前：${name}</p>
    <p>メールアドレス：${email}</p>
    <p>希望日：${date}</p>
    <p>メッセージ：${message || "なし"}</p>

    <button id="confirm-reservation">
      予約を確定する
    </button>
  `;

  const confirmButton =
    document.querySelector("#confirm-reservation");

  confirmButton.addEventListener("click", () => {
    completeReservation();
  });
}


// ----- 予約完了 -----

function completeReservation() {
  reservationPreview.innerHTML = `
    <h3>予約を受け付けました</h3>
    <p>ご予約ありがとうございます。</p>
  `;

  form.reset();
}


// ========================================
// 4. イベント
// ========================================


// ----- スクロール -----

window.addEventListener("scroll", () => {
  checkFadeIn();
});


// ----- ハンバーガーメニュー -----

menuButton.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});


// ----- 予約フォームを開く -----

openFormButton.addEventListener("click", () => {
  reservationForm.classList.toggle("open");
});


// ----- 予約フォーム送信 -----

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();
  const date = form.elements.date.value;
  const message = form.elements.message.value.trim();

  if (!name || !email || !date) {
    formMessage.textContent =
      "お名前・メールアドレス・希望日を入力してください。";

    reservationPreview.innerHTML = "";
    reservationPreview.classList.remove("show");

    return;
  }

  formMessage.textContent = "";

  showReservationPreview(
    name,
    email,
    date,
    message
  );
});


// ----- メニュー追加 -----

addMenuButton.addEventListener("click", () => {

  if (additionalMenuIndex >= additionalMenus.length) {
    return;
  }

  const newMenu =
    additionalMenus[additionalMenuIndex];

  createMenuCard(newMenu);

  additionalMenuIndex++;

  if (additionalMenuIndex >= additionalMenus.length) {
    addMenuButton.textContent = "すべて表示しました";
    addMenuButton.disabled = true;
  }
});


// ========================================
// 5. ページを開いたときの初期処理
// ========================================


// 最初のメニューを表示
menus.forEach((menu) => {
  createMenuCard(menu);
});


// 最初から画面内にある要素もフェードイン
checkFadeIn();