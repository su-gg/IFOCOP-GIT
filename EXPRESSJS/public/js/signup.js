window.addEventListener("DOMContentLoaded", () => {
  console.log(`Script signup.js chargé avec succès`);
  const signupForm = document.getElementById("signup-form");
  const notificationMessage = document.getElementById("notification-message");

  if (signupForm) {
    signupForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(signupForm);
      const formValues = new URLSearchParams(formData);

      try {
        const response = await fetch(`http://localhost:1215/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Content-Length": JSON.stringify(formValues).length,
          },
          body: formValues,
        });

        const { message, url, timeout, success } = await response.json();
        notificationMessage.innerText = message;

        if (success) {
          signupForm.reset();

          setTimeout(() => {
            if (url) {
              window.location = url;
            }
          }, timeout);
        } else {
          setTimeout(() => {
            notificationMessage.innerText = "";
            if (url) {
              window.location = url;
            }
          }, timeout);
        }
      } catch (error) {
        console.error(error);
      }
    });
  } else {
    notificationMessage.innerText = `Un problème est survenu, merci de réessayer ultérieurement.`;
  }
});
