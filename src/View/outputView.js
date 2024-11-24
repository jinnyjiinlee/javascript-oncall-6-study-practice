import { Console } from '@woowacourse/mission-utils';
import { MESSAGES } from '../Constants/messages.js';
import { parseWorkerList } from '../Model/workerListParser.js';
import { parseWorkAllotmentTime } from '../Model/workAllotmentTimeParser.js';
import { LEGAL_HOLIDAY } from '../Constants/constant.js';

export class OutputHandler {
  constructor() {
    this.dayOfWeekArr = ['월', '화', '수', '목', '금', '토', '일'];
    this.legalHoliday = LEGAL_HOLIDAY;
    this.dayOfHoliday = null;
  }

  printWorkerAllotmentList(workAllotmentTime) {
    this.workAllotmentTime = workAllotmentTime;
    this.findMonthAndDayOfWeek();
    this.checkLegalHoliday(); // 그 달의 몇일이 법정 공휴일인지 나옴 


    // 평일인지 어떻게 알 수 있을까? -> 월, 화, 수, 목, 금 (법정 휴일 X)

    // 여기 필요한 것
    // 평일 사람들 명단
    // 휴일 사람들 명단

    // //
    // if (dayOfWeekArr[0]) {
    //   this.printWeekdayWorker();
    // }

    // if (법정휴일또는주말이면) {
    //   this.printHolidayWorker();
    // }
  }

  checkLegalHoliday() {
    this.legalHoliday.forEach((holiday) => {
      if (holiday[0] === this.month) {
        this.dayOfHoliday = holiday[1];
      }
    });
  }

  findMonthAndDayOfWeek() {
    const monthAndDayOfWeek = parseWorkAllotmentTime(this.workAllotmentTime);
    this.month = Number(monthAndDayOfWeek[0]);
    this.firstDayOfWeek = monthAndDayOfWeek[1];
  }

  checkWeekday() {
    // 평일인지 확인하는 로직
    if (
      this.dayOfWeekArr[0] ||
      this.dayOfWeekArr[1] ||
      this.dayOfWeekArr[2] ||
      this.dayOfWeekArr[3] ||
      this.dayOfWeekArr[4]
    ) {
      // && (휴일이 아니여야 함)
    }
  }

  // eslint-disable-next-line max-lines-per-function

  // printWeekdayWorker() {
  //   Console.print(`${month}월 ${day}일 ${workerName}`);
  // }

  // printHolidayWorker() {
  //   if (평일인데휴일이면) {
  //     // [휴일 사람 배정 ]법정 휴일 표시 휴일 사람 배정
  //     Console.print(`${month}월 ${1}일 (휴일) ${workerName}`);
  //   }

  //   if (주말이면) {
  //     //  [휴일 사람 배정 ] 토, 일.
  //     Console.print(`${month}월 ${day}일 ${workerName}`);
  //   }
  // }
}
