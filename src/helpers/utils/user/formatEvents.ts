import { nanoid } from "nanoid";
import moment from "moment";

import { FormattedEventsItem } from "../../../types/user/user";

export const formatEvents = (
  list: gapi.client.calendar.Event[]
): FormattedEventsItem[] => {
  return list.map((item): FormattedEventsItem => {
    let date = "";
    const currentDate = moment().format("DD.MM.YY");
    const tommorowDate = moment().add(1, "day").format("DD.MM.YY");
    const eventDate = moment(item.start.dateTime || item.start.date).format(
      "DD.MM.YY"
    );

    if (currentDate === eventDate) {
      date = "Today";
    } else if (tommorowDate === eventDate) {
      date = "Tomorrow";
    } else {
      date = eventDate;
    }

    return {
      id: nanoid(),
      title: item.summary ? item.summary : "No title",
      startTime: moment(item.start.dateTime || item.start.date).format("HH:mm"),
      endTime: moment(item.end.dateTime || item.end.date).format("HH:mm"),
      date,
    };
  });
};
