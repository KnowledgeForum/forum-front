/**
 * Date String -> N hours ago, N minutes ago, N seconds ago, etc...로 변환하는 함수
 *
 * @param dateString Date 문자열
 * @returns 현재 시간과 입력된 시간의 차이를 초, 분, 시간, 일, 월, 년 단위로 반환
 */
export const getTimeAgo = (dateString: string): string => {
  const currentDate = new Date();
  const inputDate = new Date(dateString);

  const timeDifferenceInSeconds = Math.floor((currentDate.getTime() - inputDate.getTime()) / 1000);

  if (timeDifferenceInSeconds < 60) {
    return `${timeDifferenceInSeconds} sec ago`;
  } else if (timeDifferenceInSeconds < 3600) {
    const minutesAgo = Math.floor(timeDifferenceInSeconds / 60);
    return `${minutesAgo} min ago`;
  } else if (timeDifferenceInSeconds < 86400) {
    const hoursAgo = Math.floor(timeDifferenceInSeconds / 3600);
    return `${hoursAgo} hours ago`;
  } else if (timeDifferenceInSeconds < 2592000) {
    const daysAgo = Math.floor(timeDifferenceInSeconds / 86400);
    return `${daysAgo} days ago`;
  } else if (timeDifferenceInSeconds < 31536000) {
    const monthsAgo = Math.floor(timeDifferenceInSeconds / 2592000);
    return `${monthsAgo} months ago`;
  } else {
    const yearsAgo = Math.floor(timeDifferenceInSeconds / 31536000);
    return `${yearsAgo} years ago`;
  }
};

/**
 * 세 자리마다 콤마를 찍어주는 함수
 * @param number 바꾸고자 하는 숫자
 * @returns 콤마가 포함된 숫자
 */
export const getIncludeComma = (number: number): string => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/**
 * 숫자를 단위로 변환하는 함수
 * @param number 변환할 숫자
 * @returns 변환된 숫자와 단위를 포함한 문자열
 */
export const convertToUnit = (number: number): string => {
  if (number >= 1000000) {
    const convertedNumber = (number / 1000000).toFixed(1);
    return `${convertedNumber}M`;
  } else if (number >= 1000) {
    const convertedNumber = (number / 1000).toFixed(0);
    return `${convertedNumber}K`;
  } else {
    return number.toString();
  }
};
