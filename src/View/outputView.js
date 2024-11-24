import { Console } from '@woowacourse/mission-utils';
import { MESSAGES } from '../Constants/messages.js';
import { parseWorkerList } from '../Model/workerListParser.js';
import { parseWorkAllotmentTime } from '../Model/workAllotmentTimeParser.js';
import { LEGAL_HOLIDAY, DAYS_OF_MONTH } from '../Constants/constant.js';

export class OutputHandler {
  constructor() {
    this.dayOfWeekArr = ['월', '화', '수', '목', '금', '토', '일'];
    this.legalHoliday = LEGAL_HOLIDAY;
    this.dayOfHoliday = null; // 이 달의 공휴일
    this.day = 1;
    this.dayOfWeekArrIndex = 0;
  }

  // 월요일부터 쭉 도는데, 시작 요일을 따로 설정을 해야 된다.

  // eslint-disable-next-line max-lines-per-function
  printWorkerAllotmentList(workAllotmentTime) {
    this.workAllotmentTime = workAllotmentTime;
    this.findMonthAndDayOfWeek();
    this.theNumberOfMonth = DAYS_OF_MONTH[this.month];

    this.checkLegalHoliday(); // 그 달의 몇일이 법정 공휴일인지 나옴 5월 이면 5라고 나와서 값이 생겼다.

    // 여기 필요한 것
    // 평일 사람들 명단
    // 휴일 사람들 명단

    // 아래부터 이제 반복문 돌리기 얼마나 돌려야 되나? 달의 수만큼? 아니면 사람의 수 만큼? 그 달의 수만큼 그 달의 수를 보자.

    this.dayOfWeekArrIndex = this.dayOfWeekArr.indexOf(this.firstDayOfWeek); // 화요일이면 1이 된다.

    for (let i = 0; i < this.theNumberOfMonth; i += 1) {
      // 그달의 수만큼 반복문 돌리기
      // 시작 요일은?
      if (this.dayOfWeekArrIndex === 7) {
        this.dayOfWeekArrIndex = 0;
      }

      // 휴일 유무 -> 해결 되었고
      // 사람 -> 불러와야 된다

      // console.log(
      //   'this.dayOfWeekArr[this.dayOfWeekArrIndex]: ',
      //   this.dayOfWeekArr[this.dayOfWeekArrIndex],
      // );
      // console.log('this.checkWeekday(): ', this.checkWeekday());
      if (this.checkWeekday()) {
        // 평일이면 true
        this.printWeekdayWorker();
      }

      if (this.checkHoliday()) {
        this.printHolidayWorker();
      }

      this.day += 1; // 날은 하루씩 증가하면 된다.
      this.dayOfWeekArrIndex += 1; // 하나씩 증가하면된다.
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
      `${this.month}월 ${this.day}일 ${this.dayOfWeekArr[this.dayOfWeekArrIndex]} {workerName}`,
    );
  }

  // eslint-disable-next-line max-lines-per-function
  printHolidayWorker() {
    if (this.day === this.dayOfHoliday) {
      // 법정 휴일 표시 휴일 사람 배정
      Console.print(
        `${this.month}월 ${this.day}일 ${this.dayOfWeekArr[this.dayOfWeekArrIndex]}(휴일) {workerName}`,
      );
    }

    if (
      this.dayOfWeekArr[this.dayOfWeekArrIndex] === '토' ||
      this.dayOfWeekArr[this.dayOfWeekArrIndex] === '일'
    ) {
      // 주말
      Console.print(
        `${this.month}월 ${this.day}일 ${this.dayOfWeekArr[this.dayOfWeekArrIndex]} {workerName}`,
      );
    }
  }
}
