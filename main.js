console.log("Just Shamim ❤️");

document.getElementById("startBtn").onclick = () => {
  document.getElementById("intro").classList.add("hidden");
  document.getElementById("passwordPage").classList.remove("hidden");
};

document.getElementById("enterBtn").onclick = () => {
  const pass = document.getElementById("password").value.trim();

  if (pass === "1130" || pass === "66") {
    document.getElementById("passwordPage").classList.add("hidden");
    document.getElementById("birthday").classList.remove("hidden");
  } else {
    document.getElementById("error").innerText = "رمز اشتباهه 🥺";
  }
};

document.getElementById("continueBtn").onclick = () => {
  alert("از اینجا به بعد وارد دنیای ستاره‌ها میشی... ✨");
};
