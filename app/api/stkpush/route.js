import { NextResponse } from 'next/server';
import { stkPushRequest } from '../../../lib/mpesa';

export async function POST(request) {
  const payload = await request.json();

  try {
    const response = await stkPushRequest(payload);
    return NextResponse.json({ success: true, data: response });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
