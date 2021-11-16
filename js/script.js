import initConverter from "./modules/aplication-converter.js";
import OnDarkMode from "./modules/darkmod.js";

const darkMode = new OnDarkMode("[data-js='switch-mode']", "darked");
darkMode.init();
console.log(darkMode);

initConverter();
