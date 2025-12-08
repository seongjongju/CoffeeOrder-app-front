import { NextRequest, NextResponse } from "next/server";
import dessert from "./dessert.json";

export function GET(request: NextRequest) {
    return NextResponse.json(dessert)
}