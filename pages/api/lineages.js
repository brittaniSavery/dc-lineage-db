import nextConnect from "next-connect";

const handler = nextConnect();

handler.get((req, res) => {
  res.json({ hello: "World!" });
});

export default handler;
