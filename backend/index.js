const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const PORT = 5000;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is running and connected with Prisma v7!');
});

app.get('/api/books', async (req, res) => {
  try {
    console.log("Database inquiry received: Querying book table...");
    
    const manuscripts = await prisma.book.findMany({
      orderBy: { 
        createdAt: 'asc' 
      }
    });

    res.status(200).json(manuscripts);
  } catch (error) {
    console.error("Database query error details:", error);
    res.status(500).json({ error: "Failed to read data from the book database table." });
  }
});

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
