const btn = document.getElementById("btn");
const email = document.getElementById("email");

btn.onclick = async (e) => {
  e.preventDefault();
  const data = email.value;

  const response = await fetch("http://localhost:1234/server", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify({ email: data }), // body data type must match "Content-Type" header
  });
  // parses JSON response into native JavaScript objects
  const res = await response.json();
  console.log(res);
};
