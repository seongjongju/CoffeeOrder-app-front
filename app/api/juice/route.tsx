import { NextRequest, NextResponse } from "next/server";
import juice from "./juice.json";

export function GET(request: NextRequest) {
    return NextResponse.json(juice)
}
