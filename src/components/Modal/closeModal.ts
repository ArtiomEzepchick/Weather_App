export const closeModal = (delay: number = 500): void => {
  const overlay = document.querySelector(".overlay");

  if (overlay) {
    if (overlay.classList.contains("show")) {
      overlay.classList.add("hidden");

      setTimeout(() => {
        overlay.classList.remove("show");
      }, delay);
    }
  }
};
