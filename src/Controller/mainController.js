import { InputHandler } from '../View/inputView.js';

export class MainController {
  constructor() {
    this.input = new InputHandler();
  }

  async startProgram() {
    const workAllotmentTime = await this.input.getWorkAllotmentTimeInput();
    const workOnWeekdaysList = await this.input.getWorkOnWeekdaysListInput();
  }
}
