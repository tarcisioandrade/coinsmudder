export default class OnDarkMode {
  constructor(checkbox, putClass) {
    this.checkbox = document.querySelector(checkbox);
    this.activeClass = putClass;

    this.toggleClassBody = this.toggleClassBody.bind(this);
  }

  toggleClassBody() {
    console.log(this.activeClass);
    document.documentElement.classList.toggle(this.activeClass);
  }

  eventChecked() {
    this.checkbox.addEventListener("change", this.toggleClassBody);
  }

  init() {
    this.eventChecked();
  }
}
