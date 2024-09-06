import _ from 'lodash';
import dayjs from "dayjs";

export namespace DataUtils {
  export const isEmpty = obj => {
    return _.isEmpty(obj);
  };

  export const isNotEmpty = obj => {
    return !_.isEmpty(obj);
  };

  export const isUndefined = obj => {
    return _.isUndefined(obj);
  };

  export const isValid = obj => {
    return !_.isUndefined(obj) && !_.isNull(obj);
  };

  export const isFunction = obj => {
    return _.isFunction(obj);
  };

  export const isMap = obj => {
    return _.isMap(obj);
  };

  export const isArrayLike = obj => {
    return _.isArrayLike(obj);
  };

  export const isArray = obj => {
    return _.isArray(obj);
  };

  export const isEqual = (object, other) => {
    return _.isEqual(object, other);
  };

  export const isValidPhoneNumber = (phoneNumber: string) => {
    let regex =
      /^(13[0-9]|14[01456879]|15[0-9]|16[2567]|17[0-8]|18[0-9]|19[0-9])\d{8}$/;
    return DataUtils.isNotEmpty(phoneNumber) && regex.test(phoneNumber);
  };

  export const isNumber = (obj: string) => {
    const regex = /^[0-9]*$/;
    return regex.test(obj);
  };

  export const toPercentage = decimal => {
    return (decimal * 100).toFixed(2) + '%'; // 保留两位小数
  };

  export const CommonTimeFormatter ='YYYY/MM/DD HH:mm:ss';

  export const getCommonTime = (timeString?: string) => {

    return dayjs(timeString).format(CommonTimeFormatter);
  }
}
