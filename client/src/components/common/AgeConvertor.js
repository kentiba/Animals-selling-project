import dayjs from 'dayjs';

const AgeConvertor = age => {
    if (dayjs().diff(age, 'year') >= 1) {
        return dayjs().diff(age, 'year') + ' Years';
    } else if (dayjs().diff(age, 'month') >= 1) {
        return dayjs().diff(age, 'month') + ' Months';
    } else {
        return dayjs().diff(age, 'day') + ' Days';
    }
};
export default AgeConvertor;
