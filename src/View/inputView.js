import { Console } from '@woowacourse/mission-utils';
import { MESSAGES } from '../Constants/messages.js';

export class InputHandler {
  async getEmergencyWorkDetailsInput() {
    const emergencyDetails = await Console.readLineAsync(
      MESSAGES.INPUT.EMERGENCY_WORK_DETAILS,
    );

    return emergencyDetails;
  }
}
