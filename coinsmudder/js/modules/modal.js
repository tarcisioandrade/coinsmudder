export default function initModal() {
  const modalEl = document.querySelector("[data-js='modal']");
  const modalBox = document.querySelector("[data-js='modal-box']");
  const closeModalEl = document.querySelector("[data-js='closeModal']");
  const html = document.documentElement;

  modalEl.classList.add("active");
  modalBox.classList.add("active");

  const closeModal = () => {
    modalEl.classList.remove("active");
    modalBox.classList.remove("active");
  };

  const outsideClickModal = (e) => {
    if (modalEl.contains(e.target) && !modalBox.contains(e.target)) {
      modalEl.classList.remove("active");
    }
  };

  html.addEventListener("click", outsideClickModal);
  closeModalEl.addEventListener("click", closeModal);
}
