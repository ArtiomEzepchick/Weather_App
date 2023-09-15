import { FormattedEventsItem } from "../../../../../types/user/user";

export const mockEventsPayload: gapi.client.calendar.Event[] = [
  {
    kind: "calendar#event",
    etag: '"3389528986368000"',
    id: "3t974muu7cpq748v68tuduh7eb",
    status: "confirmed",
    htmlLink:
      "https://www.google.com/calendar/event?eid=M3Q5NzRtdXU3Y3BxNzQ4djY4dHVkdWg3ZWIgYXJ0ZW0uZXplcGNoaWtAbQ",
    created: "2023-06-13T13:33:15.000Z",
    updated: "2023-09-15T07:54:53.184Z",
    summary: "monk",
    creator: {
      email: "artem.ezepchik@gmail.com",
      self: true,
    },
    organizer: {
      email: "artem.ezepchik@gmail.com",
      self: true,
    },
    start: {
      dateTime: "2023-09-15T17:00:00+03:00",
      timeZone: "Europe/Minsk",
    },
    end: {
      dateTime: "2023-09-15T18:00:00+03:00",
      timeZone: "Europe/Minsk",
    },
    iCalUID: "3t974muu7cpq748v68tuduh7eb@google.com",
    sequence: 11,
    reminders: {
      useDefault: true,
    },
    description: "",
    recurrence: [],
  },
  {
    kind: "calendar#event",
    etag: '"3389528980774000"',
    id: "7a40ksbcmmq76u4hecfjl5otee",
    status: "confirmed",
    htmlLink:
      "https://www.google.com/calendar/event?eid=N2E0MGtzYmNtbXE3NnU0aGVjZmpsNW90ZWUgYXJ0ZW0uZXplcGNoaWtAbQ",
    created: "2023-06-13T13:33:04.000Z",
    updated: "2023-09-15T07:54:50.387Z",
    summary: "new test",
    creator: {
      email: "artem.ezepchik@gmail.com",
      self: true,
    },
    organizer: {
      email: "artem.ezepchik@gmail.com",
      self: true,
    },
    start: {
      dateTime: "2023-09-16T07:00:00+03:00",
      timeZone: "Europe/Minsk",
    },
    end: {
      dateTime: "2023-09-16T08:00:00+03:00",
      timeZone: "Europe/Minsk",
    },
    iCalUID: "7a40ksbcmmq76u4hecfjl5otee@google.com",
    sequence: 12,
    reminders: {
      useDefault: true,
    },
    description: "",
    recurrence: [],
  },
  {
    kind: "calendar#event",
    etag: '"3389529000104000"',
    id: "7856nih83gs4jclou84q7fblur",
    status: "confirmed",
    htmlLink:
      "https://www.google.com/calendar/event?eid=Nzg1Nm5paDgzZ3M0amNsb3U4NHE3ZmJsdXIgYXJ0ZW0uZXplcGNoaWtAbQ",
    created: "2023-05-27T08:50:44.000Z",
    updated: "2023-09-15T07:55:00.052Z",
    summary: "Тест",
    creator: {
      email: "artem.ezepchik@gmail.com",
      self: true,
    },
    organizer: {
      email: "artem.ezepchik@gmail.com",
      self: true,
    },
    start: {
      dateTime: "2023-09-18T03:45:00+03:00",
      timeZone: "Europe/Minsk",
    },
    end: {
      dateTime: "2023-09-18T04:45:00+03:00",
      timeZone: "Europe/Minsk",
    },
    iCalUID: "7856nih83gs4jclou84q7fblur@google.com",
    sequence: 10,
    reminders: {
      useDefault: true,
    },
    description: "",
    recurrence: [],
  },
];

export const mockFormattedEvents: FormattedEventsItem[] = [
  {
    id: "q9X_B5DxKONfPooFNo1Fm",
    title: "monk",
    startTime: "17:00",
    endTime: "18:00",
    date: "Today",
  },
  {
    id: "ZDoiagQQDmivTpboLks2V",
    title: "new test",
    startTime: "07:00",
    endTime: "08:00",
    date: "Tomorrow",
  },
  {
    id: "KaUfRSGCpK5ul2a4V4F2l",
    title: "Тест",
    startTime: "03:45",
    endTime: "04:45",
    date: "18.09.23",
  },
];
