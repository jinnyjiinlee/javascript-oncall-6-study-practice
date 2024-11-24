import { Console } from '@woowacourse/mission-utils';
import { parseWorkAllotmentTime } from '../Model/workAllotmentTimeParser.js';
import { LEGAL_HOLIDAY, DAYS_OF_MONTH } from '../Constants/constant.js';

export class OutputHandler {
  constructor() {
    this.dayOfWeekArr = ['월', '화', '수', '목', '금', '토', '일'];
    this.legalHoliday = LEGAL_HOLIDAY;
    this.dayOfHoliday = null; // 이 달의 공휴일
    this.day = 1;
    this.dayOfWeekArrIndex = 0;

    this.weekdayWorkersIndex = 0;
    this.holidayWorkersIndex = 0;
  }

  // 월요일부터 쭉 도는데, 시작 요일을 따로 설정을 해야 된다.

  // eslint-disable-next-line max-lines-per-function
  printWorkerAllotmentList(
    workAllotmentTime,
    parsedWeekdaysList,
    parsedHolidaysList,
  ) {
    this.workAllotmentTime = workAllotmentTime;

    this.weekdayWorkers = parsedWeekdaysList;
    this.holidayWorkers = parsedHolidaysList;

    this.findMonthAndDayOfWeek();
    this.theNumberOfMonth = DAYS_OF_MONTH[this.month];

    this.checkLegalHoliday(); // 그 달의 몇일이 법정 공휴일인지 나옴 5월 이면 5라고 나와서 값이 생겼다.

    this.dayOfWeekArrIndex = this.dayOfWeekArr.indexOf(this.firstDayOfWeek); // 화요일이면 1이 된다.

    for (let i = 0; i < this.theNumberOfMonth; i += 1) {
      if (this.weekdayWorkersIndex === this.weekdayWorkers.length) {
        this.weekdayWorkersIndex = 0;
      }

      if (this.holidayWorkers === this.holidayWorkers.length) {
        this.holidayWorkersIndex = 0;
      }
      // 그달의 수만큼 반복문 돌리기
      if (this.dayOfWeekArrIndex === 7) {
        this.dayOfWeekArrIndex = 0;
      }
      if (this.checkWeekday()) {
        this.printWeekdayWorker();
      }

      if (this.checkHoliday()) {
        this.printHolidayWorker();
      }

      this.day += 1; // 날은 하루씩 증가하면 된다.
      this.dayOfWeekArrIndex += 1; // 월 인덱스도 하나씩 증가하면된다.
    }
  }

  findMonthAndDayOfWeek() {
    const monthAndDayOfWeek = parseWorkAllotmentTime(this.workAllotmentTime);
    this.month = Number(monthAndDayOfWeek[0]);
    this.firstDayOfWeek = monthAndDayOfWeek[1];
  }

  checkLegalHoliday() {
    this.legalHoliday.forEach((holiday) => {
      if (holiday[0] === this.month) {
        this.dayOfHoliday = holiday[1];
      }
    });
  }

  // eslint-disable-next-line max-lines-per-function
  checkWeekday() {
    return (
      (this.dayOfWeekArr[this.dayOfWeekArrIndex] === '월' &&
        this.day !== this.dayOfHoliday) ||
      (this.dayOfWeekArr[this.dayOfWeekArrIndex] === '화' &&
        this.day !== this.dayOfHoliday) ||
      (this.dayOfWeekArr[this.dayOfWeekArrIndex] === '수' &&
        this.day !== this.dayOfHoliday) ||
      (this.dayOfWeekArr[this.dayOfWeekArrIndex] === '목' &&
        this.day !== this.dayOfHoliday) ||
      (this.dayOfWeekArr[this.dayOfWeekArrIndex] === '금' &&
        this.day !== this.dayOfHoliday)
    );
  }

  checkHoliday() {
    return (
      this.day === this.dayOfHoliday ||
      this.dayOfWeekArr[this.dayOfWeekArrIndex] === '토' ||
      this.dayOfWeekArr[this.dayOfWeekArrIndex] === '일'
    );
  }

  printWeekdayWorker() {
    Console.print(
      `${this.month}월 ${this.day}일 ${this.dayOfWeekArr[this.dayOfWeekArrIndex]} ${this.weekdayWorkers[this.weekdayWorkersIndex]}`,
    );
    this.weekdayWorkersIndex += 1;
  }

  // eslint-disable-next-line max-lines-per-function
  printHolidayWorker() {
    if (this.day === this.dayOfHoliday) {
      // 법정 휴일 표시 휴일 사람 배정
      Console.print(
        `${this.month}월 ${this.day}일 ${this.dayOfWeekArr[this.dayOfWeekArrIndex]}(휴일) ${this.holidayWorkers[this.holidayWorkersIndex]}`,
      );
      this.holidayWorkersIndex += 1;
    }

    if (
      this.dayOfWeekArr[this.dayOfWeekArrIndex] === '토' ||
      this.dayOfWeekArr[this.dayOfWeekArrIndex] === '일'
    ) {
      // 주말
      Console.print(
        `${this.month}월 ${this.day}일 ${this.dayOfWeekArr[this.dayOfWeekArrIndex]} ${this.holidayWorkers[this.holidayWorkersIndex]}`,
      );
      this.holidayWorkersIndex += 1;
    }
  }
}
