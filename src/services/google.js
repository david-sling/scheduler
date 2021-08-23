import googleConfig from "../config/apiGoogleconfig.json";

var gapi = window.gapi;

var event = {
  summary: "Awesome Event!",
  // location: "800 Howard St., San Francisco, CA 94103",
  // description: "Really great refreshments",
  start: {
    date: "2021-08-23",
    // timeZone: "Kolkota/India",
  },
  end: {
    date: "2021-08-23",
    // timeZone: "Kolkota/India",
  },
  // recurrence: ["RRULE:FREQ=DAILY;COUNT=2"],
  // attendees: [{ email: "lpage@example.com" }, { email: "sbrin@example.com" }],
  reminders: {
    useDefault: false,
    overrides: [
      { method: "email", minutes: 24 * 60 },
      { method: "popup", minutes: 10 },
    ],
  },
};

const login = async (cb) => {
  console.log({ gapi });
  gapi.load("client:auth2", async () => {
    gapi.client.init(googleConfig);
    gapi.client.load("calendar", "v3", () => console.log("Loaded calendar"));
    const response = await gapi.auth2.getAuthInstance().signIn();
    const {
      Ts: {
        Et: email,
        Ne: fullName,
        RT: firstName,
        TR: lastName,
        gJ: profilePicture,
        mS: id,
      },
      Zb: details,
      token_type,
    } = response;
    cb({
      email,
      fullName,
      firstName,
      lastName,
      profilePicture,
      id,
      token_type,
      ...details,
    });
  });
};

const addEvent = () => {
  var request = gapi.client.calendar.events.insert({
    calendarId: "primary",
    resource: event,
  });
  request.execute((e) => {
    window.open(e.htmlLink);
  });
};

export { login, addEvent };
