import { NextResponse } from 'next/server';
import { HfInference } from '@huggingface/inference';

export async function GET() {
  try {
    console.log('Testing Hugging Face API connection...');
    console.log('API Key:', process.env.HUGGINGFACE_API_KEY?.slice(0, 5) + '...');

    if (!process.env.HUGGINGFACE_API_KEY) {
      throw new Error('HUGGINGFACE_API_KEY is not set');
    }

    const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

    // Try a simple classification
    const response = await hf.zeroShotClassification({
      model: 'facebook/bart-large-mnli',
      inputs: 'This is a test message.',
      parameters: {
        candidate_labels: ['test', 'production'],
      },
    });

    console.log('Test response:', response);

    return NextResponse.json({
      success: true,
      message: 'Hugging Face API connection successful',
      testResult: response,
    });

  } catch (error) {
    console.error('Hugging Face API test error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }, { status: 500 });
  }
} 