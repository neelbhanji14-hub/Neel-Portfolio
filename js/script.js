(function () {

  const PUBLIC_KEY = "YOUR_PUBLIC_KEY";
  const SERVICE_ID = "YOUR_SERVICE_ID";
  const TEMPLATE_ID = "YOUR_TEMPLATE_ID";

  emailjs.init({
    publicKey: PUBLIC_KEY
  });

  const form = document.querySelector(".contact-form");
  const status = document.querySelector(".form-status");

  form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      status.textContent = "Please fill in all fields.";
      return;
    }

    const btn = form.querySelector(".btn");

    btn.disabled = true;
    btn.textContent = "Sending...";

    try {

      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: name,
          from_email: email,
          message: message
        }
      );

      status.textContent = "Message sent successfully!";

      form.reset();

    } catch (err) {

      console.error(err);

      status.textContent =
        "Failed to send. Please try again.";

    } finally {

      btn.disabled = false;
      btn.textContent = "Send Message";

    }

  });

})();