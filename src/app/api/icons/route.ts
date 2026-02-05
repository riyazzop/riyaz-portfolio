import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const iconsDir = path.join(process.cwd(), "public", "icons");

    // Check if directory exists
    if (!fs.existsSync(iconsDir)) {
      return NextResponse.json({ icons: [] });
    }

    // Read all SVG files from the icons directory
    const files = fs.readdirSync(iconsDir);
    const svgFiles = files
      .filter((file) => file.endsWith(".svg"))
      .map((file) => `/icons/${file}`);

    return NextResponse.json({ icons: svgFiles });
  } catch (error) {
    console.error("Error reading icons directory:", error);
    return NextResponse.json({ icons: [] });
  }
}
