import Intro from "./animations/intro.js";

class App {
  constructor() {
    this._createIntro();
  }

  _createIntro() {
    this.intro = new Intro();
  }

};

new App();
