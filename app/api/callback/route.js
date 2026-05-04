import { NextResponse } from 'next/server';

export async function POST(request) {
  const callbackBody = await request.json();
  console.log('MPESA callback received', callbackBody);

  return NextResponse.json({ success: true, received: callbackBody });
}
