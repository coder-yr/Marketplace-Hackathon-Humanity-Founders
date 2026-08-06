import { sign } from 'jsonwebtoken';

async function test() {
  try {
    const token = sign(
      { _id: '60d0fe4f5311236168a109ca', role: 'supplier' },
      process.env.JWT_SECRET || 'hackathon_secret_key_2024_secure_random',
      { expiresIn: '1h' }
    );

    const payload = {
      title: 'Test Title',
      subCategory: '',
      priceRange: { min: 0, max: 0, currency: 'USD', unit: 'meter' },
      moq: { value: 1, unit: 'meters' },
      stockStatus: 'made_to_order',
      variants: [],
      certifications: [],
      tags: [],
      specifications: {},
      status: 'draft'
    };

    const res = await fetch('http://localhost:5000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    console.log('Status:', res.status);
    console.log('Response:', JSON.stringify(data, null, 2));
  } catch (error: any) {
    console.log('Error:', error.message);
  }
}

test();
