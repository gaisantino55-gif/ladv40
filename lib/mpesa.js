export async function stkPushRequest(payload) {
  const url = process.env.MPESA_API_URL || 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
  const token = process.env.MPESA_ACCESS_TOKEN || '';

  if (!token) {
    throw new Error('MPESA_ACCESS_TOKEN is required to initiate STK push.');
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`MPESA request failed: ${errorBody}`);
  }

  return response.json();
}
