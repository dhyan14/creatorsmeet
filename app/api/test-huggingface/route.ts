import { NextResponse } from 'next/server';
import { HfInference } from '@huggingface/inference';

export async function GET() {
  try {
    console.log('Testing Hugging Face API connection...');
    
    // Check if API key is set
    if (!process.env.HUGGINGFACE_API_KEY) {
      throw new Error('HUGGINGFACE_API_KEY is not set');
    }

    // Log first and last few characters of API key for verification
    const apiKey = process.env.HUGGINGFACE_API_KEY;
    console.log('API Key format:', `${apiKey.slice(0, 5)}...${apiKey.slice(-5)}`);

    // Initialize Hugging Face client
    const hf = new HfInference(apiKey);

    // Try zero-shot classification
    console.log('Attempting zero-shot classification...');
    const response = await hf.zeroShotClassification({
      model: 'facebook/bart-large-mnli',
      inputs: 'This is a test message.',
      parameters: {
        candidate_labels: ['test', 'production'],
      },
    });

    console.log('Raw API response:', response);

    // Validate response format
    if (!response || typeof response !== 'object') {
      throw new Error('Invalid response format from Hugging Face API');
    }

    return NextResponse.json({
      success: true,
      message: 'Hugging Face API connection successful',
      testResult: response,
    });

  } catch (error) {
    console.error('Hugging Face API test error:', error);
    
    // Get detailed error information
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    const errorDetails = error instanceof Error ? {
      name: error.name,
      message: error.message,
      stack: error.stack,
      // @ts-ignore
      cause: error.cause,
      // @ts-ignore
      status: error.status,
      // @ts-ignore
      response: error.response
    } : error;

    console.error('Detailed error:', errorDetails);

    return NextResponse.json({
      success: false,
      error: errorMessage,
      details: errorDetails
    }, { status: 500 });
  }
} 