import { Console } from '@woowacourse/mission-utils';

// eslint-disable-next-line no-unused-vars, max-lines-per-function
export const calculateDaysTheNumberOfMonth = (
  month,
  dayOfWeek,
  parsedWeekdaysList,
) => {
  const THE_NUMBER_OF_DAYS = {
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

  const daysOfMonth = THE_NUMBER_OF_DAYS[month];

  const DAY_OF_WEEK = {
    월: 0,
    화: 1,
    수: 2,
    목: 3,
    금: 4,
  };

  const dayOfWeekOnWeekdays = ['월', '화', '수', '목', '금'];

  let i = DAY_OF_WEEK[dayOfWeek];
  let j = 0;

  for (let day = 1; day < parsedWeekdaysList.length + 1; day += 1) {
    Console.print(
      `${month}월 ${day}일 ${dayOfWeekOnWeekdays[i]} ${parsedWeekdaysList[j]}`,
    );
    i += 1;
    if (i === 5) {
      i = 0;
    }

    j += 1;
  }
};
