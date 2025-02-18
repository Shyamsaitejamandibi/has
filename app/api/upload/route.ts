import { handleUpload } from "@vercel/blob/client";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const body = await request.json();

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        return {
          allowedContentTypes: ["image/jpeg", "image/png", "application/pdf"],
          maximumSizeInBytes: 5_000_000, // 5MB
          tokenPayload: JSON.stringify({}),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        console.log("blob upload completed", blob, tokenPayload);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
