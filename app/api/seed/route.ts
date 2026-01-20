import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { collection, addDoc, getDocs, query, limit } from "firebase/firestore";
import { menuCategories, galleryImages } from "@/lib/seed-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');

  // Simple security check
  if (secret !== (process.env.SEED_SECRET || 'seed123')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Check if data already exists to avoid duplicates
    const categoriesSnapshot = await getDocs(query(collection(db, "menuCategories"), limit(1)));

    if (!categoriesSnapshot.empty) {
      return NextResponse.json({ message: "Data already exists. Skipping seeding." });
    }

    // 1. Seed Menu Categories and Items
    for (const category of menuCategories) {
      const categoryRef = await addDoc(collection(db, "menuCategories"), {
        title: category.title,
        order: menuCategories.indexOf(category),
      });

      for (const item of category.items) {
        await addDoc(collection(db, "menuItems"), {
          ...item,
          categoryId: categoryRef.id,
        });
      }
    }

    // 2. Seed Gallery
    for (const image of galleryImages) {
      await addDoc(collection(db, "gallery"), image);
    }

    return NextResponse.json({
      message: "Seeding successful",
      categoriesCount: menuCategories.length,
      galleryCount: galleryImages.length
    });
  } catch (error) {
    console.error("Seeding error:", error);
    return NextResponse.json({ error: (error as any).message }, { status: 500 });
  }
}
