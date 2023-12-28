import moment from 'moment';
import querystring from 'qs';
import crypto from 'crypto';

function sortObject(obj) {
  const sorted = {};
  const str = [];
  let key;
  for (key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
  }
  return sorted;
}
export async function POST(req: Request, res: Response) {
  process.env.TZ = 'Asia/Ho_Chi_Minh';
  const body = await req.json();
  const date = new Date();
  const userId = body.userId;
  const createDate = moment(date).format('YYYYMMDDHHmmss');

  const ipAddr = req.headers.get('x-forwarded-for');

  //   return new Response(JSON.stringify({ ipAddr }));

  const tmnCode = '4EUNAMQY';
  const secretKey = 'ZMEPVCKRZCHVRJPASGLESYRTUCFLGXGQ';
  let vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
  const returnUrl = process.env.API_HOST + '/api/vnpay/checkout';
  const orderId = moment(date).format('DDHHmmss');
  const amount = parseInt(body.total) * 100;
  const bankCode = 'NCB';

  const checkedItems = JSON.stringify(body.checkedItems);
  const userFullName = body.userFullName;
  const userEmail = body.userEmail;
  const userAddress = body.userAddress;
  const uuid = body.uuid;

  const locale = 'vn';
  const currCode = 'VND';
  let vnp_Params = {};
  vnp_Params['vnp_Version'] = '2.1.0';
  vnp_Params['vnp_Command'] = 'pay';
  vnp_Params['vnp_TmnCode'] = tmnCode;
  vnp_Params['uuid'] = uuid;
  vnp_Params['userFullName'] = userFullName;
  vnp_Params['userEmail'] = userEmail;
  vnp_Params['userAddress'] = userAddress;
  vnp_Params['checkedItems'] = checkedItems;
  vnp_Params['vnp_Locale'] = locale;
  vnp_Params['vnp_CurrCode'] = currCode;
  vnp_Params['vnp_TxnRef'] = orderId;
  vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
  vnp_Params['vnp_OrderType'] = 'other';
  vnp_Params['vnp_Amount'] = amount;
  vnp_Params['vnp_ReturnUrl'] = returnUrl;
  vnp_Params['vnp_IpAddr'] = ipAddr;
  vnp_Params['vnp_CreateDate'] = createDate;
  if (bankCode !== null) {
    vnp_Params['vnp_BankCode'] = bankCode;
  }

  vnp_Params = sortObject(vnp_Params);

  const signData = querystring.stringify(vnp_Params, { encode: false });
  const hmac = crypto.createHmac('sha512', secretKey);
  const signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
  vnp_Params['vnp_SecureHash'] = signed;
  vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

  return new Response(JSON.stringify({ vnpUrl }));
}
/**
 * Created by CTT VNPAY
 */

// router.post('/create_payment_url', function (req, res, next) {
//   process.env.TZ = 'Asia/Ho_Chi_Minh';

//   const date = new Date();
//   const createDate = moment(date).format('YYYYMMDDHHmmss');

//   const ipAddr =
//     req.headers['x-forwarded-for'] ||
//     req.connection.remoteAddress ||
//     req.socket.remoteAddress ||
//     req.connection.socket.remoteAddress;

//   const config = require('config');

//   const tmnCode = config.get('vnp_TmnCode');
//   const secretKey = config.get('vnp_HashSecret');
//   const vnpUrl = config.get('vnp_Url');
//   const returnUrl = config.get('vnp_ReturnUrl');
//   const orderId = moment(date).format('DDHHmmss');
//   const amount = req.body.amount;
//   const bankCode = req.body.bankCode;

//   const locale = req.body.language;
//   if (locale === null || locale === '') {
//     locale = 'vn';
//   }
//   const currCode = 'VND';
//   const vnp_Params = {};
//   vnp_Params['vnp_Version'] = '2.1.0';
//   vnp_Params['vnp_Command'] = 'pay';
//   vnp_Params['vnp_TmnCode'] = tmnCode;
//   vnp_Params['vnp_Locale'] = locale;
//   vnp_Params['vnp_CurrCode'] = currCode;
//   vnp_Params['vnp_TxnRef'] = orderId;
//   vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
//   vnp_Params['vnp_OrderType'] = 'other';
//   vnp_Params['vnp_Amount'] = amount * 100;
//   vnp_Params['vnp_ReturnUrl'] = returnUrl;
//   vnp_Params['vnp_IpAddr'] = ipAddr;
//   vnp_Params['vnp_CreateDate'] = createDate;
//   if (bankCode !== null && bankCode !== '') {
//     vnp_Params['vnp_BankCode'] = bankCode;
//   }

//   vnp_Params = sortObject(vnp_Params);

//   const querystring = require('qs');
//   const signData = querystring.stringify(vnp_Params, { encode: false });
//   const crypto = require('crypto');
//   const hmac = crypto.createHmac('sha512', secretKey);
//   const signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');
//   vnp_Params['vnp_SecureHash'] = signed;
//   vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

//   res.redirect(vnpUrl);
// });

export async function GET(req: Request, res: Response) {
  const { searchParams } = new URL(req.url);
  let vnp_Params = querystring.parse(searchParams.toString());
  const secureHash = vnp_Params['vnp_SecureHash'];

  delete vnp_Params['vnp_SecureHash'];
  delete vnp_Params['vnp_SecureHashType'];

  vnp_Params = sortObject(vnp_Params);

  const tmnCode = '4EUNAMQY';
  const secretKey = 'ZMEPVCKRZCHVRJPASGLESYRTUCFLGXGQ';

  const signData = querystring.stringify(vnp_Params, { encode: false });
  const hmac = crypto.createHmac('sha512', secretKey);
  const signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex');

  if (secureHash === signed) {
    //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua

    return new Response(JSON.stringify('success'));
  } else {
    return new Response(JSON.stringify('error'));
  }
}

// router.get('/vnpay_ipn', function (req, res, next) {
//     const vnp_Params = req.query;
//     const secureHash = vnp_Params['vnp_SecureHash'];

//     const orderId = vnp_Params['vnp_TxnRef'];
//     const rspCode = vnp_Params['vnp_ResponseCode'];

//     deconste vnp_Params['vnp_SecureHash'];
//     deconste vnp_Params['vnp_SecureHashType'];

//     vnp_Params = sortObject(vnp_Params);
//     const config = require('config');
//     const secretKey = config.get('vnp_HashSecret');
//     const querystring = require('qs');
//     const signData = querystring.stringify(vnp_Params, { encode: false });
//     const crypto = require("crypto");
//     const hmac = crypto.createHmac("sha512", secretKey);
//     const signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");

//     const paymentStatus = '0'; // Giả sử '0' là trạng thái khởi tạo giao dịch, chưa có IPN. Trạng thái này được lưu khi yêu cầu thanh toán chuyển hướng sang Cổng thanh toán VNPAY tại đầu khởi tạo đơn hàng.
//     //const paymentStatus = '1'; // Giả sử '1' là trạng thái thành công bạn cập nhật sau IPN được gọi và trả kết quả về nó
//     //const paymentStatus = '2'; // Giả sử '2' là trạng thái thất bại bạn cập nhật sau IPN được gọi và trả kết quả về nó

//     const checkOrderId = true; // Mã đơn hàng "giá trị của vnp_TxnRef" VNPAY phản hồi tồn tại trong CSDL của bạn
//     const checkAmount = true; // Kiểm tra số tiền "giá trị của vnp_Amout/100" trùng khớp với số tiền của đơn hàng trong CSDL của bạn
//     if(secureHash === signed){ //kiểm tra checksum
//         if(checkOrderId){
//             if(checkAmount){
//                 if(paymentStatus=="0"){ //kiểm tra tình trạng giao dịch trước khi cập nhật tình trạng thanh toán
//                     if(rspCode=="00"){
//                         //thanh cong
//                         //paymentStatus = '1'
//                         // Ở đây cập nhật trạng thái giao dịch thanh toán thành công vào CSDL của bạn
//                         res.status(200).json({RspCode: '00', Message: 'Success'})
//                     }
//                     else {
//                         //that bai
//                         //paymentStatus = '2'
//                         // Ở đây cập nhật trạng thái giao dịch thanh toán thất bại vào CSDL của bạn
//                         res.status(200).json({RspCode: '00', Message: 'Success'})
//                     }
//                 }
//                 else{
//                     res.status(200).json({RspCode: '02', Message: 'This order has been updated to the payment status'})
//                 }
//             }
//             else{
//                 res.status(200).json({RspCode: '04', Message: 'Amount invalid'})
//             }
//         }
//         else {
//             res.status(200).json({RspCode: '01', Message: 'Order not found'})
//         }
//     }
//     else {
//         res.status(200).json({RspCode: '97', Message: 'Checksum failed'})
//     }
// });

// router.post('/querydr', function (req, res, next) {

//     process.env.TZ = 'Asia/Ho_Chi_Minh';
//     const date = new Date();

//     const config = require('config');
//     const crypto = require("crypto");

//     const vnp_TmnCode = config.get('vnp_TmnCode');
//     const secretKey = config.get('vnp_HashSecret');
//     const vnp_Api = config.get('vnp_Api');

//     const vnp_TxnRef = req.body.orderId;
//     const vnp_TransactionDate = req.body.transDate;

//     const vnp_RequestId =moment(date).format('HHmmss');
//     const vnp_Version = '2.1.0';
//     const vnp_Command = 'querydr';
//     const vnp_OrderInfo = 'Truy van GD ma:' + vnp_TxnRef;

//     const vnp_IpAddr = req.headers['x-forwarded-for'] ||
//         req.connection.remoteAddress ||
//         req.socket.remoteAddress ||
//         req.connection.socket.remoteAddress;

//     const currCode = 'VND';
//     const vnp_CreateDate = moment(date).format('YYYYMMDDHHmmss');

//     const data = vnp_RequestId + "|" + vnp_Version + "|" + vnp_Command + "|" + vnp_TmnCode + "|" + vnp_TxnRef + "|" + vnp_TransactionDate + "|" + vnp_CreateDate + "|" + vnp_IpAddr + "|" + vnp_OrderInfo;

//     const hmac = crypto.createHmac("sha512", secretKey);
//     const vnp_SecureHash = hmac.update(new Buffer(data, 'utf-8')).digest("hex");

//     const dataObj = {
//         'vnp_RequestId': vnp_RequestId,
//         'vnp_Version': vnp_Version,
//         'vnp_Command': vnp_Command,
//         'vnp_TmnCode': vnp_TmnCode,
//         'vnp_TxnRef': vnp_TxnRef,
//         'vnp_OrderInfo': vnp_OrderInfo,
//         'vnp_TransactionDate': vnp_TransactionDate,
//         'vnp_CreateDate': vnp_CreateDate,
//         'vnp_IpAddr': vnp_IpAddr,
//         'vnp_SecureHash': vnp_SecureHash
//     };
//     // /merchant_webapi/api/transaction
//     request({
//         url: vnp_Api,
//         method: "POST",
//         json: true,
//         body: dataObj
//             }, function (error, response, body){
//                 console.log(response);
//             });

// });
