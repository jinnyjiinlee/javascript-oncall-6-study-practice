export const parseWorkAllotmentTime = (WorkAllotmentTimes) =>
  WorkAllotmentTimes.split(',').map((WorkAllotmentTime) =>
    WorkAllotmentTime.trim(),
  );
