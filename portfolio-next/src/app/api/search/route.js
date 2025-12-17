import { NextResponse } from 'next/server';
import { pipeline } from '@xenova/transformers';
import fs from 'fs';
import path from 'path';

// Cache the model instance to avoid reloading on every request
let embedder = null;
let embeddings = null;

async function loadModel() {
  if (!embedder) {
    console.log('Loading embedding model...');
    embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
    console.log('Model loaded!');
  }
  return embedder;
}

function loadEmbeddings() {
  if (!embeddings) {
    const embeddingsPath = path.join(process.cwd(), 'public', 'data', 'embeddings.json');
    const fileContents = fs.readFileSync(embeddingsPath, 'utf8');
    embeddings = JSON.parse(fileContents);
  }
  return embeddings;
}

function cosineSimilarity(vecA, vecB) {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

export async function POST(request) {
  try {
    const { query } = await request.json();

    if (!query || query.trim().length === 0) {
      return NextResponse.json({ results: [] });
    }

    // Load model and embeddings
    const model = await loadModel();
    const notesData = loadEmbeddings();

    // Generate embedding for query
    const output = await model(query, {
      pooling: 'mean',
      normalize: true
    });
    const queryEmbedding = Array.from(output.data);

    // Calculate similarities
    const scored = notesData.map(note => ({
      slug: note.slug,
      title: note.title,
      preview: note.preview,
      similarity: cosineSimilarity(queryEmbedding, note.embedding)
    }));

    // Sort by similarity and take top 20
    const topResults = scored
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 20)
      .filter(note => note.similarity > 0.2); // Relevance threshold

    return NextResponse.json({ results: topResults });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
}
