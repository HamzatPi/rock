window.addEventListener("load", function () {
  let countUser = document.querySelector(".count-user"),
    countComp = document.querySelector(".count-comp"),
    userField = document.querySelector(".user-field"),
    compField = document.querySelector(".comp-field"),
    sound = document.querySelector(".sound"),
    res = document.querySelector(".result"),
    play = document.querySelector(".play"),
    fields = document.querySelectorAll(".field"),
    userStep,
    compStep,
    countU = 0,
    countC = 0,
    blocked = false;

  // Функция для обновления счета
  function updateScore() {
    countUser.innerText = countU;
    countComp.innerText = countC;
  }

  // Функция для проигрывания звуков
  function playSound(type) {
    sound.setAttribute("src", `audio/${type}.mp3`);
    sound.play();
  }

  // Функция для блокировки и разблокировки действий
  function setBlocked(state) {
    blocked = state;
  }

  // Обработчик выбора пользователя
  function choiceUser(e) {
    if (blocked) return;
    let target = e.target;
    if (target.classList.contains("field")) {
      userStep = target.dataset.field;
      fields.forEach((item) => item.classList.remove("active", "error"));
      target.classList.add("active");
      choiceComp();
    }
  }

  // Выбор компьютера
  function choiceComp() {
    setBlocked(true);
    let rand = Math.floor(Math.random() * 3);
    compField.classList.add("blink");
    let compFields = compField.querySelectorAll(".field");

    setTimeout(() => {
      compField.classList.remove("blink");
      compStep = compFields[rand].dataset.field;
      compFields[rand].classList.add("active");
      winner();
    }, 3000);
  }

  // Определение победителя
  function winner() {
    setBlocked(false);
    let comb = userStep + compStep;
    switch (comb) {
      case "rr":
      case "ss":
      case "pp":
        res.innerText = "Ничья!";
        playSound("draw");
        break;

      case "rs":
      case "sp":
      case "pr":
        res.innerText = "Победили Вы!";
        playSound("win");
        countU++;
        updateScore();
        compField.querySelector("[data-field=" + compStep + "]").classList.add("error");
        break;

      case "sr":
      case "ps":
      case "rp":
        res.innerText = "Победил Компьютер!";
        playSound("loss");
        countC++;
        updateScore();
        userField.querySelector("[data-field=" + userStep + "]").classList.add("error");
        break;
    }
  }


  function playGame() {
    countU = countC = 0;
    res.innerText = "Сделайте Выбор";
    updateScore();
    fields.forEach((item) => item.classList.remove("active", "error"));
  }

  play.addEventListener("click", playGame);
  userField.addEventListener("click", choiceUser);
});
