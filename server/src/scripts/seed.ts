/**
 * Seed Script — Phase 3A
 * Seeds: Fabric Categories, Sample Verified Suppliers, and Rich B2B Textile Products
 *
 * Run: npm run seed
 */
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../../.env') })

import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { env } from '../config/env'
import { Category } from '../models/category.model'
import { User } from '../models/user.model'
import { SupplierProfile } from '../models/supplier-profile.model'
import { Product } from '../models/product.model'

const FABRIC_CATEGORIES = [
  {
    name: 'Cotton',
    slug: 'cotton',
    icon: 'Feather',
    description: 'Natural plant-based fiber. Soft, breathable, and versatile — used in apparel, home textiles, and industrial fabrics.',
    imageUrl: 'https://images.unsplash.com/photo-1606760227091-3dd850d97f1d?auto=format&fit=crop&w=800&q=80',
    featured: true,
    sortOrder: 1,
  },
  {
    name: 'Silk',
    slug: 'silk',
    icon: 'Sparkles',
    description: 'Luxury natural fiber produced by silkworms. Known for its lustrous sheen, smooth texture, and drape.',
    imageUrl: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80',
    featured: true,
    sortOrder: 2,
  },
  {
    name: 'Wool',
    slug: 'wool',
    icon: 'Shield',
    description: 'Natural animal fiber from sheep. Excellent insulation, moisture-wicking, and fire-resistant properties.',
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    featured: true,
    sortOrder: 3,
  },
  {
    name: 'Polyester',
    slug: 'polyester',
    icon: 'Zap',
    description: 'Synthetic petroleum-based fiber. Durable, wrinkle-resistant, and widely used in fast fashion and technical textiles.',
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    featured: true,
    sortOrder: 4,
  },
  {
    name: 'Linen',
    slug: 'linen',
    icon: 'Sun',
    description: 'Natural fiber derived from the flax plant. Strong, absorbent, and gets softer with each wash.',
    imageUrl: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=800&q=80',
    featured: true,
    sortOrder: 5,
  },
  {
    name: 'Denim',
    slug: 'denim',
    icon: 'Layers',
    description: 'Sturdy cotton twill weave fabric. Dyed with indigo and traditionally used for jeans and workwear.',
    imageUrl: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
    featured: true,
    sortOrder: 6,
  },
]

const SAMPLE_SUPPLIERS = [
  {
    email: 'supplier.apex@textile.com',
    fullName: 'Apex Mills & Co.',
    companyName: 'Apex Mills International',
    gstNumber: '27AAAAA0000A1Z5',
    factoryAddress: 'Surat Textile Hub, Gujarat, India',
    certifications: ['OEKO-TEX Standard 100', 'ISO 9001:2015', 'GOTS Certified'],
  },
  {
    email: 'supplier.silkroute@textile.com',
    fullName: 'Silk Route Heritage',
    companyName: 'Silk Route Heritage Looms',
    gstNumber: '29BBBBB1111B2Z6',
    factoryAddress: 'Varanasi Weaving Park, Uttar Pradesh, India',
    certifications: ['Handloom Mark', 'Silk Mark Certified', 'ISO 14001'],
  },
]

const SAMPLE_PRODUCTS = [
  {
    title: '100% Organic Combed Cotton Single Jersey',
    slug: 'organic-combed-cotton-single-jersey',
    shortDescription: 'Super soft 180 GSM ring-spun combed cotton fabric ideal for premium t-shirts and loungewear.',
    description: 'Our 100% Organic Combed Cotton Single Jersey is knitted using GOTS-certified ring-spun yarn. Featuring ultra-smooth handfeel, low shrinkage (<3%), and high color fastness. Ideal for sustainable fashion brands, luxury blanks, and high-frequency activewear.',
    categorySlug: 'cotton',
    fabricType: 'Cotton',
    images: [
      'https://images.unsplash.com/photo-1606760227091-3dd850d97f1d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1000&q=80',
    ],
    priceRange: { min: 4.5, max: 6.2, currency: 'USD', unit: 'meter' },
    moq: { value: 300, unit: 'meters' },
    leadTime: '7-12 business days',
    stockStatus: 'in_stock',
    certifications: ['GOTS Organic', 'OEKO-TEX 100'],
    tags: ['Organic', 'Jersey', 'Apparel', 'T-Shirt', 'Eco-Friendly'],
    specifications: {
      Weight: '180 GSM',
      Width: '60 inches (152 cm)',
      Composition: '100% Organic Cotton',
      YarnCount: '30s Combed',
      Shrinkage: '< 3%',
    },
    featured: true,
  },
  {
    title: 'Raw Mulberry Silk Habotai 8mm',
    slug: 'raw-mulberry-silk-habotai-8mm',
    shortDescription: 'Lightweight lustrous pure silk habotai fabric suitable for high-end linings and scarves.',
    description: 'Crafted from 100% Grade 6A Mulberry Silk, this 8mm Habotai offers an incomparable silky drape, glossy luster, and hypoallergenic skin feel. Loved by couture designers and luxury scarf artisans.',
    categorySlug: 'silk',
    fabricType: 'Silk',
    images: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
    ],
    priceRange: { min: 14.0, max: 18.5, currency: 'USD', unit: 'meter' },
    moq: { value: 100, unit: 'meters' },
    leadTime: '10-15 business days',
    stockStatus: 'made_to_order',
    certifications: ['Silk Mark', 'OEKO-TEX 100'],
    tags: ['Luxury', 'Silk', 'Habotai', 'Couture', 'Scarf'],
    specifications: {
      Weight: '35 GSM (8 momme)',
      Width: '44 inches (112 cm)',
      Composition: '100% Mulberry Silk',
      Grade: '6A Pure Raw',
    },
    featured: true,
  },
  {
    title: 'Heavyweight Heavy Duty Selvedge Denim 14oz',
    slug: 'heavyweight-selvedge-denim-14oz',
    shortDescription: 'Authentic 14 oz shuttle loom red-line selvedge denim fabric dyed in deep indigo.',
    description: 'Old-school vintage shuttle loom denim with distinctive red selvedge ID. Made with ring-spun Indian cotton and rope-dyed in authentic indigo dye. Perfect for premium jeans, jackets, and utility aprons.',
    categorySlug: 'denim',
    fabricType: 'Denim',
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=1000&q=80',
    ],
    priceRange: { min: 7.8, max: 9.5, currency: 'USD', unit: 'meter' },
    moq: { value: 500, unit: 'meters' },
    leadTime: '14-20 business days',
    stockStatus: 'in_stock',
    certifications: ['ISO 9001:2015', 'BCI Cotton'],
    tags: ['Denim', 'Selvedge', 'Indigo', 'Workwear', 'Heavyweight'],
    specifications: {
      Weight: '14 oz / sq yd (475 GSM)',
      Width: '32 inches (Selvedge)',
      Composition: '100% Cotton Twill 3/1',
      Dyeing: 'Rope Dyed Pure Indigo',
    },
    featured: true,
  },
  {
    title: 'Pure Belgian Flax Linen Natural Unbleached',
    slug: 'pure-belgian-flax-linen-natural',
    shortDescription: 'Medium-weight 220 GSM European flax linen with slubby texture for apparel and home decor.',
    description: '100% natural, unbleached linen woven from long-staple flax. Naturally thermo-regulating, anti-bacterial, and breathable. Exceptional longevity and vintage texture for trousers, shirts, and curtains.',
    categorySlug: 'linen',
    fabricType: 'Linen',
    images: [
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1606760227091-3dd850d97f1d?auto=format&fit=crop&w=1000&q=80',
    ],
    priceRange: { min: 8.5, max: 11.0, currency: 'USD', unit: 'meter' },
    moq: { value: 200, unit: 'meters' },
    leadTime: '7-14 business days',
    stockStatus: 'in_stock',
    certifications: ['European Flax Certified', 'OEKO-TEX 100'],
    tags: ['Linen', 'Flax', 'Natural', 'Home Textiles', 'Apparel'],
    specifications: {
      Weight: '220 GSM',
      Width: '58 inches (147 cm)',
      Composition: '100% European Flax Linen',
      Finish: 'Enzyme Washed',
    },
    featured: true,
  },
  {
    title: 'Recycled Polyester Microfleece Thermal Fabric',
    slug: 'recycled-polyester-microfleece-thermal',
    shortDescription: 'Eco-friendly 240 GSM fleece fabric made from 100% post-consumer plastic bottles.',
    description: 'High-performance recycled PET microfleece engineered for outerwear insulation, hoodies, and blankets. Double-sided anti-pilling finish with hydrophobic warmth retention.',
    categorySlug: 'polyester',
    fabricType: 'Polyester',
    images: [
      'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80',
    ],
    priceRange: { min: 3.8, max: 5.4, currency: 'USD', unit: 'meter' },
    moq: { value: 500, unit: 'meters' },
    leadTime: '10-18 business days',
    stockStatus: 'in_stock',
    certifications: ['GRS (Global Recycled Standard)', 'OEKO-TEX 100'],
    tags: ['Recycled', 'Fleece', 'Sustainable', 'Thermal', 'Activewear'],
    specifications: {
      Weight: '240 GSM',
      Width: '63 inches (160 cm)',
      Composition: '100% rPET (Recycled Polyester)',
      Finish: 'Anti-Pilling 2-Side',
    },
    featured: false,
  },
  {
    title: 'Australian Merino Wool Suiting Fabric 120s',
    slug: 'australian-merino-wool-suiting-120s',
    shortDescription: 'Super 120s fine Merino wool worsted twill for bespoke tailoring and luxury suits.',
    description: 'Exquisite Super 120s Australian Merino wool fabric woven with 2-ply worsted yarns. Smooth drape, natural wrinkle resistance, and subtle sheen for executive suits and formal trousers.',
    categorySlug: 'wool',
    fabricType: 'Wool',
    images: [
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=80',
    ],
    priceRange: { min: 18.0, max: 24.0, currency: 'USD', unit: 'meter' },
    moq: { value: 150, unit: 'meters' },
    leadTime: '14-21 business days',
    stockStatus: 'made_to_order',
    certifications: ['Woolmark Certified', 'ISO 9001'],
    tags: ['Wool', 'Merino', 'Suiting', 'Luxury', 'Worsted'],
    specifications: {
      Weight: '280 GSM',
      Width: '59 inches (150 cm)',
      Composition: '100% Super 120s Merino Wool',
      Weave: '2/2 Twill Worsted',
    },
    featured: true,
  },
]

async function seed() {
  console.log('🌱 Starting Marketplace Seed Phase 3A...')

  await mongoose.connect(env.MONGODB_URI)
  console.log('✅ Connected to MongoDB')

  // 1. Seed Categories
  const categoryMap = new Map<string, mongoose.Types.ObjectId>()
  for (const cat of FABRIC_CATEGORIES) {
    const doc = await Category.findOneAndUpdate(
      { slug: cat.slug },
      { $set: cat },
      { upsert: true, new: true }
    )
    categoryMap.set(cat.slug, doc._id as mongoose.Types.ObjectId)
  }
  console.log(`✅ Seeded ${FABRIC_CATEGORIES.length} Categories`)

  // 2. Seed Suppliers
  const passwordHash = await bcrypt.hash('Supplier123!', 10)
  const supplierDocs = []

  for (const s of SAMPLE_SUPPLIERS) {
    const userDoc = await User.findOneAndUpdate(
      { email: s.email },
      {
        $set: {
          fullName: s.fullName,
          email: s.email,
          password: passwordHash,
          role: 'supplier',
          isOnboarded: true,
          isActive: true,
        },
      },
      { upsert: true, new: true }
    )

    await SupplierProfile.findOneAndUpdate(
      { userId: userDoc._id },
      {
        $set: {
          userId: userDoc._id,
          companyName: s.companyName,
          gstNumber: s.gstNumber,
          factoryAddress: s.factoryAddress,
          certifications: s.certifications,
          profileCompletion: 100,
          verified: true,
        },
      },
      { upsert: true, new: true }
    )

    supplierDocs.push(userDoc)
  }
  console.log(`✅ Seeded ${supplierDocs.length} Verified Suppliers`)

  // 3. Seed Products
  for (let i = 0; i < SAMPLE_PRODUCTS.length; i++) {
    const p = SAMPLE_PRODUCTS[i]
    const catId = categoryMap.get(p.categorySlug)
    const supplier = supplierDocs[i % supplierDocs.length]

    if (catId && supplier) {
      await Product.findOneAndUpdate(
        { slug: p.slug },
        {
          $set: {
            supplierId: supplier._id,
            title: p.title,
            slug: p.slug,
            shortDescription: p.shortDescription,
            description: p.description,
            category: catId,
            fabricType: p.fabricType,
            images: p.images,
            priceRange: p.priceRange,
            moq: p.moq,
            leadTime: p.leadTime,
            stockStatus: p.stockStatus,
            certifications: p.certifications,
            tags: p.tags,
            specifications: p.specifications,
            featured: p.featured,
            published: true,
            status: 'active',
            isDeleted: false,
          },
        },
        { upsert: true, new: true }
      )
    }
  }

  console.log(`✅ Seeded ${SAMPLE_PRODUCTS.length} Rich B2B Textile Products`)
  console.log(`📦 Total Products in DB: ${await Product.countDocuments()}`)

  await mongoose.disconnect()
  console.log('✅ Seed Phase 3A Complete!')
}

seed().catch((err) => {
  console.error('❌ Seed Failed:', err)
  process.exit(1)
})
