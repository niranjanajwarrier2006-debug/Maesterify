import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🧹 Clearing existing database records...');
  await prisma.trackingStep.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.book.deleteMany({});
  
  // Clear any old users if the table exists
  try {
    await prisma.user.deleteMany({});
  } catch (error) {
    console.log('Skipping user clear (table name might differ)');
  }

  console.log('👤 Initializing default Archmaester account...');
  // Adjust 'user' to match your exact schema model name if it's different (e.g., 'account')
  await prisma.user.create({
    data: {
      email: 'admin@archive.com',
      password: 'password123', // If your app uses hashed ciphers, use your signup route or a pre-hashed string here
      name: 'Grand Maester',
    },
  });

  console.log('📚 Initializing Maesterify Dark Academia catalog...');

  const genres = ['Arcane History', 'Alchemical Theory', 'Forbidden Lore', 'Classical Philosophy', 'Poetry & Tragedy'];
  const rarities = ['common', 'uncommon', 'rare', 'legendary'];
  const authors = ['Maester Gregory', 'Archmaester Vane', 'Lady Seraphina', 'The Nameless Scribe', 'Professor Blackwood'];

  const booksToCreate = [];

  for (let i = 1; i <= 105; i++) {
    const assignedGenre = genres[i % genres.length];
    const assignedRarity = rarities[i % rarities.length];
    const assignedAuthor = authors[i % authors.length];
    
    let basePrice = 15.00;
    if (assignedRarity === 'uncommon') basePrice = 35.50;
    if (assignedRarity === 'rare') basePrice = 75.00;
    if (assignedRarity === 'legendary') basePrice = 180.00;

    booksToCreate.push({
      title: `Grimoire Volume ${i}: Chronicles of ${assignedGenre}`,
      author: assignedAuthor,
      price: parseFloat((basePrice + (i * 0.25)).toFixed(2)),
      coverUrl: `https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&auto=format&fit=crop&q=60`,
      formats: ['PDF', 'EPUB', 'Audiobook'],
      lore: `A preserved ink parchment dating back centuries, exploring deep concepts regarding ${assignedGenre.toLowerCase()}. Hand-bound in leather at the citadel libraries.`,
      rarity: assignedRarity,
      genre: assignedGenre,
    });
  }

  console.log(`⚡ Injecting ${booksToCreate.length} books into the PostgreSQL tables...`);
  
  for (const book of booksToCreate) {
    await prisma.book.create({
      data: book,
    });
  }

  console.log('✨ Database seeding complete! The grand archive is fully stocked.');
}

main()
  .catch((e) => {
    console.error('❌ Error during database seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });