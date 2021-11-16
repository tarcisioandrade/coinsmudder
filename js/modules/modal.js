export default class Modal {
  constructor(modal, modalBox, closeModal, putClass) {
    this.modalEl = document.querySelector(modal);
    this.modalBox = document.querySelector(modalBox);
    this.closeModalEl = document.querySelector(closeModal);
    this.html = document.documentElement;
    this.activeClass = putClass;

    this.closeModal = this.closeModal.bind(this);
    this.outsideClickModal = this.outsideClickModal.bind(this);
  }

  closeModal() {
    this.modalEl.classList.remove(this.activeClass);
    this.modalBox.classList.remove(this.activeClass);
  }

  outsideClickModal(e) {
    if (this.modalEl.contains(e.target) && !this.modalBox.contains(e.target)) {
      this.modalEl.classList.remove(this.activeClass);
    }
  }

  addModalEvents() {
    this.html.addEventListener("click", this.outsideClickModal);
    this.closeModalEl.addEventListener("click", this.closeModal);
  }

  init() {
    this.modalEl.classList.add(this.activeClass);
    this.modalBox.classList.add(this.activeClass);
    this.addModalEvents();
  }
}
