const express = require("express");
const app = express();
const PORT = 1234;
const Cors = require("cors");
const moment = require("moment");
const bodyParser = require("body-parser");

const { createHash } = require("crypto");

// Without middleware
app.use(Cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.post("/", function (req, res, next) {
  var tmnCode = "YDPX0R9W";
  var secretKey = "JYGLMASANCWCHRQEQPYBYDFFYKEDIJJN";
  var vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
  var returnUrl = "http://localhost:3000/loopkup";

  var date = new Date();

  var createDate = moment(date).format("YYYYMMDDHHmmss");
  var orderId = moment(date).format("YYYYMMDDHHmmss") + "lxc";
  var amount = req.body.total;
  var bankCode = "NCB";

  var orderInfo = "Lexuanchau";
  var orderType = "110000";
  var locale = "vn";
  if (locale === null || locale === "") {
    locale = "vn";
  }
  var currCode = "VND";
  var vnp_Params = {};
  vnp_Params["vnp_Version"] = "2.1.0";
  vnp_Params["vnp_Command"] = "pay";
  vnp_Params["vnp_TmnCode"] = "YDPX0R9W";
  vnp_Params["vnp_Amount"] = amount * 100;
  if (bankCode !== null && bankCode !== "") {
    vnp_Params["vnp_BankCode"] = bankCode;
  }
  vnp_Params["vnp_CreateDate"] = createDate;
  vnp_Params["vnp_CurrCode"] = currCode;
  vnp_Params["vnp_IpAddr"] = "192.168.1.103";
  vnp_Params["vnp_Locale"] = locale;
  vnp_Params["vnp_OrderInfo"] = orderInfo;
  //   vnp_Params["vnp_OrderType"] = orderType;
  vnp_Params["vnp_ReturnUrl"] = returnUrl;
  vnp_Params["vnp_TxnRef"] = orderId;

  //   vnp_Params["vnp_Merchant"] = "";
  function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        str.push(encodeURIComponent(key));
      }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
      sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
  }

  vnp_Params = sortObject(vnp_Params);

  var querystring = require("qs");
  var signData = querystring.stringify(vnp_Params, { encode: false });
  var crypto = require("crypto");
  var hmac = crypto.createHmac("sha512", secretKey);
  var signed = hmac.update(new Buffer.from(signData)).digest("hex");
  vnp_Params["vnp_SecureHash"] = signed;
  vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });
  res.json(vnpUrl);
});
// Vui lòng tham khảo thêm tại code demo

app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
