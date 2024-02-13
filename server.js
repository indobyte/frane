const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
const port = process.env.PORT || 8080;
app.use(
    cors({
        origin: "*"
    })
);

var prize = [
    {
        url: "https://i.ibb.co/z6PCKN3/100.jpg",
        value: "100 $DEGEN"
    },
    {
        url: "https://i.ibb.co/BPqk5rZ/200.jpg",
        value: "200 $DEGEN"
    },
    {
        url: "https://i.ibb.co/zNFrbRS/300.jpg",
        value: "300 $DEGEN"
    },
    {
        url: "https://i.ibb.co/qrfZJbC/400.jpg",
        value: "400 $DEGEN"
    },
    {
        url: "https://i.ibb.co/DMyMdwz/900.jpg",
        value: "900 $DEGEN"
    }
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
    var frame = createFrame(
        "https://i.ibb.co/P17RQMV/banner.jpg",
        "Roll Now !"
    );
    res.send(frame);
});

app.post("/frame", function (req, res) {
    var ran = Math.floor(Math.random() * prize.length);
    var fid = req.body.untrustedData.fid;
    var cari = data.find(id => id.id == fid);
    if (!cari) {
        var frame = createFrame(
            "https://i.ibb.co/9ZqyJXV/alert.jpg",
            "Try Again!"
        );
        res.send(frame);
        data.push({ id: fid });
    } else {
        var frame = createFrame(prize[ran].url, prize[ran].value);
        res.send(frame);
        data = []
    }
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
