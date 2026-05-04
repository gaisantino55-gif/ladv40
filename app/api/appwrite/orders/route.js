import { NextResponse } from 'next/server';
import { databases } from '../../../../lib/appwrite';

export async function POST(request) {
  try {
    const order = await request.json();

    if (!order || !order.items || !Array.isArray(order.items)) {
      return NextResponse.json({ error: 'Invalid order payload.' }, { status: 400 });
    }

    const databaseId = process.env.APPWRITE_DATABASE_ID;
    const collectionId = process.env.APPWRITE_ORDER_COLLECTION_ID;

    if (!databaseId || !collectionId) {
      return NextResponse.json(
        { error: 'APPWRITE_DATABASE_ID or APPWRITE_ORDER_COLLECTION_ID is not configured.' },
        { status: 500 }
      );
    }

    const savedOrder = await databases.createDocument(
      databaseId,
      collectionId,
      'unique()',
      order
    );

    return NextResponse.json(savedOrder, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Unable to save order.' }, { status: 500 });
  }
}
