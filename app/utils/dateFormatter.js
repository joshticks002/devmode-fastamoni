import dayjs from "dayjs";
import "dayjs/locale/en"; // import locale
import advancedFormat from "dayjs/plugin/advancedFormat"; // import plugin

dayjs.extend(advancedFormat); // use plugin

export default formatDate = date =>
  dayjs(new Date(date)).format("dddd, Do MMMM YYYY");