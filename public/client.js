document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signed-url-form");
  const resultContainer = document.createElement("div");
  resultContainer.id = "result-container";
  form.parentNode.insertBefore(resultContainer, form.nextSibling);

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
        resultContainer.innerHTML = `<a href="${data.signedURL}" target="_blank">Signed URL</a>`;
      } else {
        resultContainer.textContent = "Failed to get signed URL";
      }

      form.reset();
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  });
});
