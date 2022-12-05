import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc) //dayjs扩展支持utc


export function formUtcString(utcString,DATE_TIME_FORMAT) {
  if(!DATE_TIME_FORMAT) {
    DATE_TIME_FORMAT="YYYY-MM-DD HH:mm:ss"
  } 
  return dayjs.utc(utcString).format(DATE_TIME_FORMAT)
}