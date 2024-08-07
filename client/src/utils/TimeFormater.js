import { format } from "date-fns";

export default function TimeFormater(date) {
  const formetedDate = format(date, "dd/MMMM/yyyy");
  return formetedDate.replaceAll("/", " ");
}
