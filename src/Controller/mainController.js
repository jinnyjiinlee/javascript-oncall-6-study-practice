/* eslint-disable max-lines-per-function */
import { InputHandler } from '../View/inputView.js';
import { parseWorkAllotmentTime } from '../Model/workAllotmentTimeParser.js';
import { AllotmentHandler } from '../Model/theNumberOfDaysInMonth.js';
import { parseWorkerList } from '../Model/workerListParser.js';

export class MainController {
  constructor() {
    this.input = new InputHandler();
  }

  async startProgram() {
    // 여기서 달을 -> 숫자로 입력 / 요일을 -> 한 글자로 입력

    const workAllotmentTime = await this.input.getWorkAllotmentTimeInput();
    // const workAllotmentTime = '5, 수';
    const parsedMonthAndDayOfWeek = parseWorkAllotmentTime(workAllotmentTime);

    const month = parsedMonthAndDayOfWeek[0];
    const dayOfWeek = parsedMonthAndDayOfWeek[1];

    // 여기서 명단을 입력
    const workOnWeekdaysList = await this.input.getWorkOnWeekdaysListInput();
    const workHolidaysList = await this.input.getWorkHolidayListInput();

    // const workOnWeekdaysList = '지니, 호리, 버미, 상호';

    // 명단을 입력하면 배열로 parse 해야 된다.
    const parsedWeekdaysList = parseWorkerList(workOnWeekdaysList);

    // const workHolidaysList = '버미, 예지, 지니, 상호';
    const parsedHolidaysList = parseWorkerList(workHolidaysList);

    new AllotmentHandler().calculateDaysTheNumberOfMonth(
      month,
      dayOfWeek,
      parsedWeekdaysList,
      parsedHolidaysList,
    );
  }
}
