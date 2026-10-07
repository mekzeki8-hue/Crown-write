import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getDb } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    // Get authenticated user from Clerk
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const pool = await getDb();

    // Fetch humanization history for the user (latest 50 records)
    const { rows } = await pool.query(
      `SELECT 
        id, 
        original_text, 
        humanized_text, 
        tone, 
        word_count, 
        credits_used, 
        created_at
      FROM humanization_history 
      WHERE user_id = $1 
      ORDER BY created_at DESC 
      LIMIT 50`,
      [userId]
    );

    return NextResponse.json({
      success: true,
      history: rows,
      count: rows.length,
    });

  } catch (error: any) {
    console.error("❌ Error fetching history:", error);
    return NextResponse.json(
      { error: "Failed to fetch history" },
      { status: 500 }
    );
  }
}
