import { InputHandler } from '../View/inputView.js';
import { OutputHandler } from '../View/outputView.js';

import { parseWorkerList } from '../Model/workerListParser.js';

export class MainController {
  constructor() {
    this.input = new InputHandler();
    this.output = new OutputHandler();
  }

  async startProgram() {
    const workAllotmentTime = await this.input.getWorkAllotmentTimeInput();

    const workOnWeekdaysList = await this.input.getWorkOnWeekdaysListInput();
    const workHolidaysList = await this.input.getWorkHolidayListInput();

    // 입력한 평일 근무자
    const parsedWeekdaysList = parseWorkerList(workOnWeekdaysList);

    // 입력한 휴일 근무자
    const parsedHolidaysList = parseWorkerList(workHolidaysList);

    this.output.printWorkerAllotmentList(workAllotmentTime, parsedWeekdaysList, parsedHolidaysList);
  }
}
