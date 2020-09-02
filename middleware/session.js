import { ironSession } from "next-iron-session";

const session = ironSession({
  cookieName: "dcldb-session",
  password: process.env.SECRET_COOKIE_PASSWORD,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
});

export default session;
