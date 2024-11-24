import { Console } from '@woowacourse/mission-utils';
import { MESSAGES } from '../Constants/messages.js';
import { WorkDetailsValidator } from '../Validation/workDetailsValidatior.js';
import { parseWorkAllotmentTime } from '../Model/workAllotmentTimeParser.js';

export class InputHandler {
  async getWorkAllotmentTimeInput() {
    while (true) {
      try {
        const WorkAllotmentTime = await Console.readLineAsync(
          MESSAGES.INPUT.WORK_ALLOTMENTS_TIME,
        );
        const parsedMonthAndDayOfWeek =
          parseWorkAllotmentTime(WorkAllotmentTime);

        this.month = parsedMonthAndDayOfWeek[0];
        this.dayOfWeek = parsedMonthAndDayOfWeek[1];

        new WorkDetailsValidator().validateWorkDetails(
          this.month,
          this.dayOfWeek,
        );
        return WorkAllotmentTime;
      } catch (e) {
        Console.print(e.message);
      }
    }
  }

  async getWorkOnWeekdaysListInput() {
    const workOnWeekdaysList = await Console.readLineAsync(
      MESSAGES.INPUT.WORK_ON_WEEKDAYS_LIST,
    );

    return workOnWeekdaysList;
  }

  async getWorkHolidayListInput() {
    const workHolidaysList = await Console.readLineAsync(
      MESSAGES.INPUT.WORK_HOLIDAYS__LIST,
    );

    return workHolidaysList;
  }
}
