import {Router} from "./route.js";

class App {
    constructor() {
        this.router = new Router();
        window.addEventListener('DOMContentLoaded', this.handleRoutingChanging.bind(this));
        window.addEventListener('popstate', this.handleRoutingChanging.bind(this));
    }

    handleRoutingChanging() {
        this.router.openRoute();
    }
}

(new App());