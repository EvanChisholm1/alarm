import "./style.css";

const offButton = document.querySelector("#off");

const url = import.meta.env.VITE_SERVER || "http://localhost:3000/";
console.log(import.meta.env.VITE_SERVER);

offButton.addEventListener("click", async () => {
  console.log("bruh");
  const res = await fetch(url, {
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
