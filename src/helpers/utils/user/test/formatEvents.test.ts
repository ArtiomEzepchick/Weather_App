import { formatEvents } from "../formatEvents";
import {
  mockEventsPayload,
  mockFormattedEvents,
} from "./__mocks__/formatEvents.mock";
import moment from "moment";

describe("formatEvents", () => {
  const formattedEvents = formatEvents(mockEventsPayload);

  it("returns the correct number of items", () => {
    expect(formattedEvents.length).toBe(mockEventsPayload.length);
  });

  it("formats events correctly", () => {
    formattedEvents.forEach((formattedEvent, index) => {
      const originalEvent = mockEventsPayload[index];
      const expectedFormattedEvent = mockFormattedEvents[index];

      expect(formattedEvent.id).toHaveLength(21);
      expect(formattedEvent.title).toBe(expectedFormattedEvent.title);
      expect(formattedEvent.startTime).toBe(expectedFormattedEvent.startTime);
      expect(formattedEvent.endTime).toBe(expectedFormattedEvent.endTime);
      expect(formattedEvent.date).toBe(expectedFormattedEvent.date);

      if (
        moment(originalEvent.start.dateTime || originalEvent.start.date).isSame(
          moment(),
          "day"
        )
      ) {
        expect(formattedEvent.date).toBe("Today");
      } else if (
        moment(originalEvent.start.dateTime || originalEvent.start.date).isSame(
          moment().add(1, "day"),
          "day"
        )
      ) {
        expect(formattedEvent.date).toBe("Tomorrow");
      } else {
        expect(formattedEvent.date).toBe(
          moment(
            originalEvent.start.dateTime || originalEvent.start.date
          ).format("DD.MM.YY")
        );
      }
    });
  });
});
