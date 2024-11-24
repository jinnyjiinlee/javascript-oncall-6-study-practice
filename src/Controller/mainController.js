import { InputHandler } from '../View/inputView.js';

export class MainController {
  constructor() {
    this.input = new InputHandler();
  }

  async startProgram() {
    const emergencyWorkDetails = await this.input.getEmergencyWorkDetailsInput();

  }
}
