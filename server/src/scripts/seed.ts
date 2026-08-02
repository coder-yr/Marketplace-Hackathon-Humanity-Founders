/**
 * Seed Script — Phase 0
 * Seeds: Fabric Categories
 *
 * Run: npm run seed
 */
import 'dotenv/config'
import mongoose from 'mongoose'
import { env } from '../config/env'
import { Category } from '../models/category.model'

const FABRIC_CATEGORIES = [
  {
    name: 'Cotton',
    slug: 'cotton',
    description: 'Natural plant-based fiber. Soft, breathable, and versatile — used in apparel, home textiles, and industrial fabrics.',
  },
  {
    name: 'Silk',
    slug: 'silk',
    description: 'Luxury natural fiber produced by silkworms. Known for its lustrous sheen, smooth texture, and drape.',
  },
  {
    name: 'Wool',
    slug: 'wool',
    description: 'Natural animal fiber from sheep. Excellent insulation, moisture-wicking, and fire-resistant properties.',
  },
  {
    name: 'Polyester',
    slug: 'polyester',
    description: 'Synthetic petroleum-based fiber. Durable, wrinkle-resistant, and widely used in fast fashion and technical textiles.',
  },
  {
    name: 'Linen',
    slug: 'linen',
    description: 'Natural fiber derived from the flax plant. Strong, absorbent, and gets softer with each wash.',
  },
  {
    name: 'Denim',
    slug: 'denim',
    description: 'Sturdy cotton twill weave fabric. Dyed with indigo and traditionally used for jeans and workwear.',
  },
  {
    name: 'Chiffon',
    slug: 'chiffon',
    description: 'Lightweight sheer plain woven fabric. Made from silk, polyester, or nylon. Used in evening wear and scarves.',
  },
  {
    name: 'Velvet',
    slug: 'velvet',
    description: 'Soft, dense, cut-pile fabric with a distinctive sheen. Used in luxury garments and upholstery.',
  },
  {
    name: 'Rayon/Viscose',
    slug: 'rayon-viscose',
    description: 'Semi-synthetic cellulose-based fiber. Soft, breathable, and drapes beautifully. Eco-friendlier than fully synthetic fibers.',
  },
  {
    name: 'Nylon',
    slug: 'nylon',
    description: 'Synthetic polyamide fiber. Extremely strong, elastic, and abrasion-resistant. Used in activewear and hosiery.',
  },
  {
    name: 'Spandex/Lycra',
    slug: 'spandex-lycra',
    description: 'Highly elastic synthetic fiber. Can stretch up to 600% of its length. Essential for activewear and form-fitting garments.',
  },
  {
    name: 'Georgette',
    slug: 'georgette',
    description: 'Sheer, lightweight crinkled fabric. Made from silk or synthetic fibers. Used in blouses, dresses, and sarees.',
  },
]

async function seed() {
  console.log('🌱 Starting seed...')

  await mongoose.connect(env.MONGODB_URI)
  console.log('✅ Connected to MongoDB')

  // Upsert categories
  let created = 0
  let updated = 0

  for (const category of FABRIC_CATEGORIES) {
    const result = await Category.findOneAndUpdate(
      { slug: category.slug },
      { $set: category },
      { upsert: true, new: true },
    )
    if (result.isNew !== undefined) {
      created++
    } else {
      updated++
    }
  }

  console.log(`✅ Categories seeded: ${created} created, ${updated} updated`)
  console.log(`📦 Total categories in DB: ${await Category.countDocuments()}`)

  await mongoose.disconnect()
  console.log('✅ Seed complete. Connection closed.')
}

seed().catch((error) => {
  console.error('❌ Seed failed:', error)
  process.exit(1)
})
