// routes/payment.momo.js (Node/Express)
import express from 'express';
import crypto from 'crypto';
import axios from 'axios';

const router = express.Router();

router.post('/create', async (req, res) => {
  try {
    const { amount = '50000', orderInfo = 'pay with MoMo', bookingId = '' } = req.body;

    // SANDBOX KEYS — thay bằng của bạn, và đưa vào .env nếu muốn:
    const partnerCode = process.env.MOMO_PARTNER_CODE 
    const accessKey   = process.env.MOMO_ACCESS_KEY   
    const secretKey   = process.env.MOMO_SECRET_KEY  

    const redirectUrl = process.env.MOMO_REDIRECT_URL 
    const ipnUrl      = process.env.MOMO_IPN_URL      
    const endpoint    = process.env.MOMO_ENDPOINT     

    // Validate required envs early for clearer errors
    const missing = [];
    if (!partnerCode) missing.push('MOMO_PARTNER_CODE');
    if (!accessKey) missing.push('MOMO_ACCESS_KEY');
    if (!secretKey) missing.push('MOMO_SECRET_KEY');
    if (!redirectUrl) missing.push('MOMO_REDIRECT_URL');
    if (!ipnUrl) missing.push('MOMO_IPN_URL');
    if (!endpoint) missing.push('MOMO_ENDPOINT');
    if (missing.length) {
      return res.status(400).json({ success: false, message: `Missing env: ${missing.join(', ')}` });
    }

    const requestType = 'captureWallet';
    const requestId   = partnerCode + Date.now();
    const orderId     = requestId;
    const extraData   = bookingId; // truyền bookingId để IPN map ngược

    const rawSignature =
      `accessKey=${accessKey}` +
      `&amount=${amount}` +
      `&extraData=${extraData}` +
      `&ipnUrl=${ipnUrl}` +
      `&orderId=${orderId}` +
      `&orderInfo=${orderInfo}` +
      `&partnerCode=${partnerCode}` +
      `&redirectUrl=${redirectUrl}` +
      `&requestId=${requestId}` +
      `&requestType=${requestType}`;

    const signature = crypto.createHmac('sha256', secretKey)
      .update(rawSignature)
      .digest('hex');

    const payload = {
      partnerCode,
      accessKey,
      requestId,
      amount,
      orderId,
      orderInfo,
      redirectUrl,
      ipnUrl,
      extraData,
      requestType,
      signature,
      lang: 'vi',
    };

    const { data } = await axios.post(
      `${endpoint}/v2/gateway/api/create`,
      payload,
      { headers: { 'Content-Type': 'application/json' } }
    );

    // Trả dữ liệu cần cho FE (không trả secret!)
    res.json({
      success: true,
      orderId,
      payUrl: data.payUrl,
      deeplink: data.deeplink,
      qrCodeUrl: data.qrCodeUrl, // chuỗi dữ liệu QR
    });
  } catch (err) {
    console.error('MoMo create error:', err?.response?.data || err.message);
    res.status(500).json({ success: false, message: err?.response?.data?.message || 'Create MoMo error' });
  }
});

// IPN callback từ MoMo
router.post('/ipn', async (req, res) => {
  try {
    const body = req.body || {};
    // Yêu cầu thành công từ MoMo
    if (String(body.resultCode) === '0') {
      const bookingId = body.extraData;
      if (bookingId) {
        // Cập nhật trạng thái thanh toán và khóa ghế
        const { default: Booking } = await import('../models/Booking.js');
        const { default: Show } = await import('../models/Show.js');
        const booking = await Booking.findById(bookingId);
        if (booking && !booking.isPaid) {
          const showData = await Show.findById(booking.show);
          if (showData) {
            booking.bookedSeats.forEach((seat) => {
              showData.occupiedSeats[seat] = booking.user;
            });
            showData.markModified('occupiedSeats');
            await showData.save();
          }
          booking.isPaid = true;
          await booking.save();
        }
      }
    }
    // Trả response theo yêu cầu MoMo (resultCode 0)
    return res.json({ resultCode: 0, message: 'OK' });
  } catch (err) {
    console.error('MoMo IPN error:', err?.response?.data || err.message);
    return res.status(200).json({ resultCode: 0, message: 'Received' });
  }
});

export default router;
