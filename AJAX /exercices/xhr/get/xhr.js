window.document.addEventListener("DOMContentLoaded", () => {
  const title = document.getElementById("xhrResultTitle");
  const body = document.getElementById("xhrResultBody");
  const getButton = document.getElementById("xhrGet");
  let counter = 1;

  getButton.addEventListener("click", (event) => {
    const xhr = new XMLHttpRequest();
    const method = "GET";
    const xhrUrl = `https://jsonplaceholder.typicode.com/posts/${counter}`;

    xhr.open(method, xhrUrl);
    xhr.addEventListener("readystatechange", () => {
      if (4 === xhr.readyState) {
        const jsonData = JSON.parse(xhr.responseText);
        counter++;
        title.innerHTML = jsonData.title;
        body.innerHTML = jsonData.body;
      }
    });
    xhr.addEventListener("error", (event) => {
      console.log("event: ", event);
    });
    xhr.send();
  });
});
