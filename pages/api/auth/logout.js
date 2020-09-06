import nextConnect from "next-connect";
import middleware from "../../../middleware";

const handler = nextConnect();
handler.use(middleware);

handler.get((req, res) => {
  req.session.destroy();
  res.status(307);
  res.setHeader("Location", "/");
  res.setHeader("Content-Length", 0);
  res.end();
});

export default handler;
