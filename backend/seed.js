const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const baseManuscripts = [
  {
    title: "The Shadow of the Alchemist",
    author: "Alistair Crowley",
    price: 45.00,
    coverUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500",
    formats: ["Hardcopy", "E-Book", "Audiobook"],
    lore: "A leather-bound manuscript recovered from the forgotten lower vaults of the Grand Library, containing ciphered formulas for transmuting structural lead.",
    rarity: "Mythic",
    genre: "Alchemy & Hermetics"
  },
  {
    title: "Chronicles of the Ink Serpent",
    author: "Evelyn Vance",
    price: 29.99,
    coverUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500",
    formats: ["Hardcopy", "E-Book"],
    lore: "An esoteric historical account detailing an ancient academic order that transcribed texts using ink harvested from midnight serpents.",
    rarity: "Rare",
    genre: "Forbidden History"
  },
  {
    title: "The Whispering Walls of Somnus",
    author: "Julian Blackwood",
    price: 18.50,
    coverUrl: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=500",
    formats: ["E-Book", "Audiobook"],
    lore: "An architectural study of dream-bound universities and halls that only exist within the subconscious of sleeping scholars.",
    rarity: "Common",
    genre: "Oneiromancy"
  },
  {
    title: "Tears of the Stained Glass",
    author: "Helena Rose",
    price: 34.00,
    coverUrl: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500",
    formats: ["Hardcopy"],
    lore: "A poetic anthology detailing the tragic architectural history and hauntings of the old gothic cathedrals of northern Europe.",
    rarity: "Rare",
    genre: "Gothic Poetry"
  },
  {
    title: "The Nocturnal Syllabus",
    author: "Professor V. Mortensen",
    price: 55.00,
    coverUrl: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=500",
    formats: ["Hardcopy", "Audiobook"],
    lore: "The unauthorized curriculum of a clandestine midnight society operating within the walls of a centuries-old university boarding house.",
    rarity: "Mythic",
    genre: "Academic Mysteries"
  },
  {
    title: "Anatomy of Melancholia",
    author: "Robert Burton III",
    price: 22.00,
    coverUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500",
    formats: ["Hardcopy", "E-Book", "Audiobook"],
    lore: "A psychological and emotional wellness exploration treating scholarly burnout through medieval philosophy and tea formulations.",
    rarity: "Common",
    genre: "Emotional Wellness"
  },
  {
    title: "The Lexicon of Alchemical Ciphers",
    author: "Maester Corvus",
    price: 39.95,
    coverUrl: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500",
    formats: ["Hardcopy", "E-Book"],
    lore: "A reference index mapping out linguistic shifts and hidden visual cryptograms embedded within 17th-century dark literature.",
    rarity: "Rare",
    genre: "Alchemy & Hermetics"
  }
];

async function main() {
  console.log("⏳ Wiping previous placeholder entries...");
  await prisma.book.deleteMany({});

  console.log("📚 Injecting 105 structural book manuscripts into the database...");
  
  let totalSeeded = 0;
  for (let i = 1; i <= 15; i++) {
    for (const book of baseManuscripts) {
      await prisma.book.create({
        data: {
          title: `${book.title} (Vol. ${i})`,
          author: book.author,
          price: parseFloat((book.price + (i * 1.25)).toFixed(2)),
          coverUrl: book.coverUrl,
          formats: book.formats,
          lore: `${book.lore} This edition represents Volume ${i} of the preserved records.`,
          rarity: book.rarity,
          genre: book.genre
        }
      });
      totalSeeded++;
    }
  }

  console.log(`✨ Success! Loaded exactly ${totalSeeded} dynamic records into \"The Whispering Shelves\".`);
}

main()
  .catch((e) => {
    console.error("❌ Seeding execution failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await pool.end();
  });
