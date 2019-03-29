import dayjs from 'dayjs';

const AgeConvertor = dateOfBirth => {
    if (dayjs().diff(dateOfBirth, 'year') >= 1) {
        return dayjs().diff(dateOfBirth, 'year') + ' Years';
    } else if (dayjs().diff(dateOfBirth, 'month') >= 1) {
        return dayjs().diff(dateOfBirth, 'month') + ' Months';
    } else {
        return dayjs().diff(dateOfBirth, 'day') + ' Days';
    }
};
export default AgeConvertor;
