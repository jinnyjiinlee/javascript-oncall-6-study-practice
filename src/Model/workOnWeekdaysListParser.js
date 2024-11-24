export const parseWorkOnWeekdaysList = (WorkAllotmentTimes) =>
  WorkAllotmentTimes.split(',').map((WorkAllotmentTime) =>
    WorkAllotmentTime.trim(),
  );
