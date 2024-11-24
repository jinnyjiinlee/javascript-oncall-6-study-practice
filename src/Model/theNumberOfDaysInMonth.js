import { Console } from '@woowacourse/mission-utils';

// eslint-disable-next-line no-unused-vars, max-lines-per-function
export class AllotmentHandler {
  constructor() {}

  // eslint-disable-next-line max-lines-per-function
  calculateDaysTheNumberOfMonth(
    monthInput,
    dayOfWeekInput,
    parsedWeekdaysList,
    parsedHolidaysList,
  ) {
    this.monthInput = monthInput;
    this.dayOfWeekInput = dayOfWeekInput;
    this.parsedWeekdaysList = parsedWeekdaysList;
    this.parsedHolidaysList = parsedHolidaysList;

    this.THE_NUMBER_OF_DAYS = {
      1: 31,
      2: 28,
      3: 31,
      4: 30,
      5: 31,
      6: 30,
      7: 31,
      8: 31,
      9: 30,
      10: 31,
      11: 30,
      12: 31,
    };

    this.DAY_OF_WEEK = {
      월: 0,
      화: 1,
      수: 2,
      목: 3,
      금: 4,
      토: 5,
      일: 6,
    };

    this.dayOfWeek = ['월', '화', '수', '목', '금', '토', '일'];

    this.weekNumber = this.DAY_OF_WEEK[dayOfWeekInput];

    this.workerList = [];
    this.dayPrint = 0;

    // 만약 법정 공휴일이면 요일 뒤에 (휴일) 붙이기
    this.LEGAL_HOLIDAY = [
      [1, 1],
      [3, 1],
      [5, 5],
      [6, 6],
      [8, 15],
      [10, 3],
      [10, 9],
      [12, 25],
    ];

    // 워크 리스트를 평일에는 -> 평일 / 주말에는 -> 주말로 하면 안되나? 그것 말고는 같으니깐

    this.loopLength = parsedWeekdaysList.length + parsedHolidaysList.length;
    Console.print('');
    this.printLoop();
  }

  // eslint-disable-next-line max-lines-per-function
  printLoop() {
    let weekdaysListArrNumber = 0;
    let weekendListArrNumber = 0;

    // 겹치는 거  만약에 평일 근

    for (let day = 1; day < this.loopLength + 1; day += 1) {
      let Holiday = '';

      for (let i = 0; i < this.LEGAL_HOLIDAY.length; i += 1) {
        // eslint-disable-next-line max-depth
        if (
          Number(this.monthInput) === this.LEGAL_HOLIDAY[i][0] &&
          day === this.LEGAL_HOLIDAY[i][1]
        ) {
          // console.log('들어왔나????')
          Holiday = '(휴일)';
        }
      }

      if (
        (this.dayOfWeek[this.weekNumber] === '월' && Holiday === '') ||
        (this.dayOfWeek[this.weekNumber] === '화' && Holiday === '') ||
        (this.dayOfWeek[this.weekNumber] === '수' && Holiday === '') ||
        (this.dayOfWeek[this.weekNumber] === '목' && Holiday === '') ||
        (this.dayOfWeek[this.weekNumber] === '금' && Holiday === '')
      ) {
        this.workerList = this.parsedWeekdaysList[weekdaysListArrNumber];
        weekdaysListArrNumber += 1;
      }

      // 만약 주말이나 휴일이면
      if (
        this.dayOfWeek[this.weekNumber] === '토' ||
        this.dayOfWeek[this.weekNumber] === '일' ||
        Holiday === '휴일'
      ) {
        this.workerList = this.parsedHolidaysList[weekendListArrNumber];
        weekendListArrNumber += 1;
        // 평일 수아 = 주말 수아
        // eslint-disable-next-line max-depth
        // console.log(
        //   'this.parsedWeekdaysList[weekdaysListArrNumber-1]: ',
        //   this.parsedWeekdaysList[weekdaysListArrNumber - 1],
        // );
        // console.log('this.workerList: ', this.workerList);

        if (
          this.parsedWeekdaysList[weekdaysListArrNumber - 1] === this.workerList
        ) {
          // 바꾸는 방법?
          const sua = this.parsedHolidaysList[weekendListArrNumber];
          this.parsedHolidaysList[weekendListArrNumber] =
            this.parsedHolidaysList[weekendListArrNumber + 1];
          this.parsedHolidaysList[weekendListArrNumber + 1] = sua;

          this.workerList = this.parsedHolidaysList[weekendListArrNumber];
        }
      }

      // 이전 평일 근무자와 지금 휴일 근무자가 같을 경우

      // 만약 연속 2일은 안된다. 만약에
      // 평일근무를 수아가 한번 하고 -> 그 다음 휴일 근무를 수아가 하면 -> 다음 휴일 근무자와 수아가 휴일 근무 배열에서 바뀌어야 된다.

      Console.print(
        `${this.monthInput}월 ${day}일 ${this.dayOfWeek[this.weekNumber]}${Holiday} ${this.workerList}`,
      );

      this.weekNumber += 1;
      if (this.weekNumber === 7) {
        this.weekNumber = 0;
      }
    }
  }
}
