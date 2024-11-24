export class WorkDetailsValidator {
  validateWorkDetails(month, dayOfWeek) {
    this.month = Number(month);
    this.dayOfWeek = Number(dayOfWeek);

    this.getValidationChecks().forEach((arr) => {
      if (arr[0]) throw new Error(arr[1]);
    });

    return true;
  }

  // TODO: 트러블 슈팅 정리
  isEmpty() {
    return this.month === '';
  }

  isScope() {
    return this.month === 0 || this.month > 12;
  }
  // isStringNumeric() {
  //   return this.parseCarNames.some((carName) => !Number.isNaN(Number(carName)));
  // }

  // // TODO: 정리해서 공부하기 every 가 아니라 some
  // hasNumericCharacters() {
  //   return this.parseCarNames.some((carName) => /\d/.test(carName));
  // }

  // isValidLength() {
  //   return this.parseCarNames.some((carName) => carName.length > 5);
  // }

  getValidationChecks() {
    return [
      [this.isEmpty(), '[ERROR] 빈 값을 입력하셨습니다.'],
      [this.isScope(), '[ERROR] 월은 1이상 입력하여 주세요.'],
    ];
  }
}
