import "./style.css";
import Alpine from "alpinejs";
import templates from "./templates";

window.Alpine = Alpine;

Alpine.data("templates", templates);

Alpine.start();
