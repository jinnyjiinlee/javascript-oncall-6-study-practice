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


    for (let day = 1; day < this.loopLength + 1; day += 1) {
      let Holiday = '';
      // 만약 평일이면

      for (let i = 0; i < this.LEGAL_HOLIDAY.length; i += 1) {
        // eslint-disable-next-line max-depth
        // console.log('Number(this.monthInput): ', Number(this.monthInput))
        // console.log('day: ', day)
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

      // 만약 주말이면
      if (
        this.dayOfWeek[this.weekNumber] === '토' ||
        this.dayOfWeek[this.weekNumber] === '일' ||
        Holiday === '휴일'
      ) {
        this.workerList = this.parsedHolidaysList[weekendListArrNumber];
        weekendListArrNumber += 1;
      }

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
