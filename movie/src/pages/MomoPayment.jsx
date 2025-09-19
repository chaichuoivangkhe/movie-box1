// src/pages/MomoPayment.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { QRCodeSVG } from 'qrcode.react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext.jsx'

const MomoPayment = () => {
  const [loading, setLoading] = useState(true);
  const [orderId, setOrderId] = useState('');
  const [payUrl, setPayUrl] = useState('');
  const [qrData, setQrData] = useState('');
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { getToken } = useAppContext();
  const [isPaid, setIsPaid] = useState(false)
  const [buyerName, setBuyerName] = useState('')
  const [buyerPhone, setBuyerPhone] = useState('')
  const [buyerEmail, setBuyerEmail] = useState('')
  const [voucher, setVoucher] = useState('')
  const defaultAmount = '50000'
  const orderInfo = 'pay with MoMo'
  const [amountToPay, setAmountToPay] = useState(defaultAmount)

  // ví dụ dữ liệu đầu vào

  useEffect(() => {
    const run = async () => {
      try {
        // Lấy thông tin booking để hiển thị số tiền
        if (bookingId) {
          try {
            const { data } = await axios.get(`/api/booking/detail/${bookingId}`)
            if (data.success) setAmountToPay(String(data.booking.amount))
          } catch (_) {}
        }
        // Gọi backend để tạo giao dịch & ký
        const effectiveAmount = bookingId
          ? (await (async () => {
              try {
                const { data } = await axios.get(`/api/booking/detail/${bookingId}`)
                if (data.success) return String(data.booking.amount)
              } catch (_) {}
              return amountToPay
            })())
          : amountToPay
        const { data } = await axios.post('/api/payment/create', { amount: effectiveAmount, orderInfo, bookingId });
        if (!data?.success) throw new Error('Cannot create momo payment');

        setOrderId(data.orderId);
        setPayUrl(data.payUrl);
        // Lưu chuỗi dữ liệu QR để render bằng component QRCode
        if (data.qrCodeUrl) {
          setQrData(data.qrCodeUrl);
        } else if (data.payUrl) {
          setQrData(data.payUrl);
        }
      } catch (e) {
        console.error(e);
        alert('Lỗi tạo thanh toán MoMo');
      } finally {
        setLoading(false);
      }
    };
    run();
  }, []);
  // Poll trạng thái isPaid qua IPN
  useEffect(() => {
    if (!bookingId) return;
    const id = setInterval(async () => {
      try {
        const { data } = await axios.get(`/api/booking/status/${bookingId}`)
        if (data.success && data.isPaid) {
          clearInterval(id)
          navigate('/my-bookings')
        }
      } catch (_) {}
    }, 3000)
    return () => clearInterval(id)
  }, [bookingId])

  const confirmPayment = async () => {
    try {
      if (!bookingId) {
        alert('Thiếu bookingId');
        return;
      }
      const { data } = await axios.post('/api/booking/confirm', {
        bookingId,
        buyerName,
        buyerPhone,
        buyerEmail
      }, {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })
      if (data.success) {
        setIsPaid(true)
        setQrData('')
        setTimeout(() => navigate('/my-bookings'), 1200)
      }
    } catch (e) {
      console.error(e)
      alert('Xác nhận thanh toán thất bại')
    }
  }

  if (loading) return <div className="min-h-[60vh] flex items-center justify-center">Đang tạo thanh toán…</div>;

  return (
    <div className="px-6 md:px-16 lg:px-40 pt-20 md:pt-50 pb-20 md:pb-50 min-h-[70vh] flex flex-col items-center gap-6">
      <h1 className="text-xl font-semibold">Thanh toán MoMo QR</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <div className="p-6 bg-gray-800 rounded-xl flex flex-col gap-4 w-full">
          <div>
            <label className='text-sm opacity-80'>Họ và tên</label>
            <input value={buyerName} onChange={e => { setBuyerName(e.target.value); try { localStorage.setItem('buyerName', e.target.value) } catch(_){} }} className='w-full mt-1 px-3 py-2 rounded bg-gray-700 outline-none' placeholder='Nguyễn Văn A' />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='text-sm opacity-80'>Số điện thoại</label>
              <input value={buyerPhone} onChange={e => { setBuyerPhone(e.target.value); try { localStorage.setItem('buyerPhone', e.target.value) } catch(_){} }} className='w-full mt-1 px-3 py-2 rounded bg-gray-700 outline-none' placeholder='0901xxxxxx' />
            </div>
            <div>
              <label className='text-sm opacity-80'>Email</label>
              <input value={buyerEmail} onChange={e => { setBuyerEmail(e.target.value); try { localStorage.setItem('buyerEmail', e.target.value) } catch(_){} }} className='w-full mt-1 px-3 py-2 rounded bg-gray-700 outline-none' placeholder='email@example.com' />
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='text-sm opacity-80'>Voucher</label>
              <input value={voucher} onChange={e => setVoucher(e.target.value)} className='w-full mt-1 px-3 py-2 rounded bg-gray-700 outline-none' placeholder='VOUCHER2025' />
            </div>
            <div>
              <label className='text-sm opacity-80'>Số tiền thanh toán</label>
              <input disabled value={amountToPay} className='w-full mt-1 px-3 py-2 rounded bg-gray-700 outline-none' />
            </div>
          </div>
          <button onClick={confirmPayment} className="mt-2 px-6 py-2 bg-blue-900 hover:bg-blue-800 rounded self-start">Tôi đã thanh toán</button>
        </div>

        <div className="p-6 bg-gray-800 rounded-xl flex flex-col items-center gap-4 w-full">
        {!isPaid && qrData ? (
          <>
            <div className="bg-white p-3 rounded">
              <QRCodeSVG value={qrData} size={256} includeMargin />
            </div>
            <p className="text-sm opacity-80 text-center">Mở app MoMo → Quét mã để thanh toán.</p>
          </>
        ) : (
          <p className="text-green-400 font-semibold">Đã thanh toán thành công</p>
        )}
        {payUrl && (
          <a
            href={payUrl}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 bg-pink-600 rounded hover:bg-pink-500 text-white"
          >
            Hoặc bấm để mở trang MoMo
          </a>
        )}
        </div>
      </div>

      {orderId && <p className="text-xs opacity-70">Mã đơn: {orderId}</p>}
    </div>
  );
};

export default MomoPayment;
