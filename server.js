const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
const port = process.env.PORT || 8080;
app.use(
  cors({
    origin: "*",
  })
);

var prize = [
  {
    url: "https://i.ibb.co/z6PCKN3/100.jpg",
    value: 100,
  },
  {
    url: "https://i.ibb.co/BPqk5rZ/200.jpg",
    value: 200,
  },
  {
    url: "https://i.ibb.co/zNFrbRS/300.jpg",
    value: 300,
  },
  {
    url: "https://i.ibb.co/qrfZJbC/400.jpg",
    value: 400,
  },
  {
    url: "https://i.ibb.co/DMyMdwz/900.jpg",
    value: 900,
  },
];
var data = [];
function createFrame(thumb, button) {
  const html = `
  <!DOCTYPE html>
  <html>
  <head>
  <meta charset="utf-8">
  <title>Farcaster x Express Frame template</title>
  <meta property="og:title" content="Sam Broner's express farcaster frame template" />
  <meta property="og:image" content="https://example.com/img.png" />
<meta property="fc:frame" content="vNext" />
<meta property="fc:frame:image" content="${thumb}" />
<meta property="fc:frame:button:1" content="${button}" />
</head>
</html>`;
  return html;
}

app.get("/frame", function (req, res) {
  var frame = createFrame("https://i.ibb.co/P17RQMV/banner.jpg", "Roll Now !");
  res.send(frame);
});

app.post("/frame", function (req, res) {
  var ran = Math.floor(Math.random() * prize.length);
  var fid = req.body.untrustedData.fid;

  var cari = data.find((id) => id.id == fid);
  console.log(cari);
  console.log(req.body.untrustedData);

  if (!cari) {
    var frame = createFrame("https://i.ibb.co/9ZqyJXV/alert.jpg", "Try Again!");
    res.send(frame);
    data.push({ id: fid, reward: 0 });
  }
  if (cari.reward <= 0) {
    var hadiah = prize[ran].value;
    var frame = createFrame(prize[ran].url, `You Win ${hadiah} $DEGEN`);
    index = data
      .map(function (x) {
        return x.id;
      })
      .indexOf(fid);
    data[index].reward = hadiah;
    res.send(frame);
  }
  if (cari.reward > 0) {
    var frame = createFrame(
      "https://i.ibb.co/p4ZGL75/1707554023-picsay.jpg",
      `You Already Claimed : ${cari.reward} $DEGEN`
    );
    res.send(frame);
  }
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
