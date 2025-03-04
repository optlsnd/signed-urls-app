document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signed-url-form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const urlInput = document.getElementById("url").value;
    const lifetimeInput = document.getElementById("lifetime").value;

    try {
      const url = new URL(urlInput);
      const path = url.pathname;

      const response = await fetch(
        `/sign?path=${encodeURIComponent(path)}&lifetime=${lifetimeInput}`
      );
      const data = await response.json();

      if (data.signedURL) {
        alert(`Signed URL: ${data.signedURL}`);
      } else {
        alert("Failed to get signed URL");
      }

      form.reset();
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  });
});
