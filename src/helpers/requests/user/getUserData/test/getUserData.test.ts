import { getUserData } from "../getUserData";
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();

describe("getUserData", () => {
  const token = "test_token";

  afterEach(() => {
    fetchMock.resetMocks();
  });

  it("fetches user data correctly", async () => {
    const mockResponse = {
      id: "123",
      email: "test@test.com",
      name: "John Smith",
      given_name: "John",
      family_name: "Smith",
      picture: "https://test.com/test.jpg",
      locale: "en",
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const userData = await getUserData(token);

    expect(userData).toEqual(mockResponse);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${token}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    );
  });

  it("throws an error when status is not 200", async () => {
    const errorMessage = "Error: 404 Not Found";
    fetchMock.mockRejectOnce(new Error("404 Not Found"));

    await expect(getUserData(token)).rejects.toThrow(errorMessage);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("throws an error when invalid token is provided", async () => {
    const token = "invalid_token";
    const errorMessage = "Error: 401 Unauthorized";
    fetchMock.mockRejectOnce(new Error("401 Unauthorized"));

    await expect(getUserData(token)).rejects.toThrow(errorMessage);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("throws an error when response contains invalid JSON", async () => {
    const invalidJSON = "this is not json}";
    fetchMock.mockResponseOnce(invalidJSON);

    await expect(getUserData(token)).rejects.toThrow();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("handles multiple successive calls correctly", async () => {
    const token2 = "test_token_2";

    const mockResponse1 = {
      id: "123",
      email: "test1@test.com",
      name: "John Smith",
    };

    const mockResponse2 = {
      id: "456",
      email: "test2@test.com",
      name: "Jane Smith",
    };

    fetchMock.mockResponses(
      JSON.stringify(mockResponse1),
      JSON.stringify(mockResponse2)
    );

    const userData1 = await getUserData(token);
    const userData2 = await getUserData(token2);

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock.mock.calls[0][0]).toEqual(
      `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${token}`
    );
    expect(fetchMock.mock.calls[1][0]).toEqual(
      `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${token2}`
    );
    expect(userData1).toEqual(mockResponse1);
    expect(userData2).toEqual(mockResponse2);
  });
});
