import "./style.css";

const offButton = document.querySelector("#off");

offButton.addEventListener("click", async () => {
  console.log("bruh");
  const res = await fetch("http://localhost:3000", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      newState: false,
    }),
  });
  console.log(res);
  const body = await res.body;
  console.log(body);
});
