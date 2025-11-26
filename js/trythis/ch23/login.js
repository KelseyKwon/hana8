const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const $frm = document.getElementById("frm");
const $buttons = document.querySelector(".buttons");
const $email = document.getElementById("email");
const $passwd = document.getElementById("passwd");

// if (process.env.NODE_ENV === 'development') {}
// if (process.env.NODE_ENV !== 'development') {}
$email.value = localStorage.getItem("login-email");
// $passwd.value = "121212";

// buttons을 없애기

$frm.addEventListener("submit", (e) => {
  // action으로 간다.
  e.preventDefault();
  e.stopPropagation();

  //   console.log(">>>", email);

  const email = $email.value;
  const passwd = $passwd.value;
  if (!email || !emailRegex.test(email)) {
    alert("Input the email address!");
    $email.select().focus();
    return;
  }
  if (!passwd || passwd.length < 6) {
    alert("Input the password over 6 characters!");
    $passwd.focus();
    return;
  }

  localStorage.setItem("login-email", email);
  document.getElementById("login-email").textContent = email;
  //   [...document.getElementsByClassName("buttons > button")].forEach(
  //   [...document.querySelectorAll(".buttons")].forEach(
  //     (ele) => (ele.style.display = "none")
  //   );

  toggleInputsAndButtons();
  document.querySelector("#sign-out").style.display = "block";

  const $div = document.createElement("div");
  $div.innerHTML = `<p class="text-center">${email}</p>`;
  $frm.appendChild($div);
});

function toggleInputsAndButtons() {
  const displayState = $buttons.style.display === "none" ? "block" : "none";
  [...document.getElementsByTagName("input")].forEach(
    (inp) => (inp.style.display = "none")
  );
  $buttons.style.display = displayState;
  document.getElementById("sign-out").style.display =
    displayState === "none" ? "block" : "none";
}

const $sign_out = document.getElementById("sign-out");
// $sign_out.style.display = "none";

document.getElementById("btn-logout").addEventListener("click", (e) => {
  e.preventDefault(); //이래야 bubbling이 안된다.
  toggleInputsAndButtons();
});
