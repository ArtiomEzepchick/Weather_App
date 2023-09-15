import { getCalendarEvents } from "../getCalendarEvents";
import fetchMock from "jest-fetch-mock";
import { CALENDAR_URL } from "../../../../constants/user/user";

fetchMock.enableMocks();

describe("getCalendarEvents", () => {
  const token = "test_token";

  afterEach(() => {
    fetchMock.resetMocks();
  });

  it("returns parsed json data on successful request", async () => {
    const mockData = [
      { id: 1, title: "Event 1" },
      { id: 2, title: "Event 2" },
    ];

    fetchMock.mockResponseOnce(JSON.stringify(mockData), { status: 200 });

    const response = await getCalendarEvents(token);

    expect(response).toEqual(mockData);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(CALENDAR_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
  });

  it("throws an error for non-200 response", async () => {
    const errorMessage = `Error: expected status 200 but got 401`;

    fetchMock.mockResponseOnce("Unauthorized", { status: 401 });
    await expect(getCalendarEvents(token)).rejects.toThrow(errorMessage);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("throws an error when request fails", async () => {
    const errorMessage = "Network Error";

    fetchMock.mockRejectOnce(new Error(errorMessage));
    await expect(getCalendarEvents(token)).rejects.toThrow(errorMessage);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
