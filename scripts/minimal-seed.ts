
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, limit } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB1QhXpSw3J8o0PWrU02A42EjZOXSwW_qw",
  authDomain: "bhojan-a035e.firebaseapp.com",
  projectId: "bhojan-a035e",
  storageBucket: "bhojan-a035e.firebasestorage.app",
  messagingSenderId: "1036132540604",
  appId: "1:1036132540604:web:687330e516303b523ab0b9",
  measurementId: "G-6QTYZ7WMP8"
};

const menuCategories = [
  {
    title: "मुख्य व्यंजन (Main Dishes)",
    items: [
      {
        name: "Mithila Dal Bhat",
        description: "Traditional lentil curry with steamed rice, a staple of Mithila cuisine",
        price: "₹180",
        isVeg: true,
        isSpecial: true,
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=400&h=300",
        ingredients: ["Basmati Rice", "Mixed Lentils", "Turmeric", "Cumin", "Ginger", "Garlic", "Ghee"],
        preparationTime: "25 minutes",
        spiceLevel: 2,
        calories: "420 kcal",
        allergens: ["Gluten"],
        story: "This traditional combination has been the heart of Mithila meals for centuries, representing the perfect balance of protein and carbohydrates.",
      }
    ]
  }
];

async function seed() {
  console.log("Seeding one item to test...");
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  try {
    const categoryRef = await addDoc(collection(db, "menuCategories"), {
      title: menuCategories[0].title,
      order: 0,
    });
    console.log("Category added: ", categoryRef.id);

    await addDoc(collection(db, "menuItems"), {
      ...menuCategories[0].items[0],
      categoryId: categoryRef.id,
    });
    console.log("Item added");
  } catch (error) {
    console.error("Seed error: ", (error as any).message);
  }
}

seed().catch(console.error);
