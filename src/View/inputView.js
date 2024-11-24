import { Console } from '@woowacourse/mission-utils';
import { MESSAGES } from '../Constants/messages.js';

export class InputHandler {
  async getWorkAllotmentTimeInput() {
    const WorkAllotmentTime = await Console.readLineAsync(
      MESSAGES.INPUT.WORK_ALLOTMENTS_TIME,
    );

    return WorkAllotmentTime;
  }

  async getWorkOnWeekdaysListInput() {
    const workOnWeekdaysList = await Console.readLineAsync(
      MESSAGES.INPUT.WORK_ON_WEEKDAYS_LIST,
    );

    return workOnWeekdaysList;
  }
}
