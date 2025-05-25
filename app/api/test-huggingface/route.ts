import { NextResponse } from 'next/server';

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

    // Make direct API request
    console.log('Making direct API request...');
    const response = await fetch('https://api-inference.huggingface.co/models/facebook/bart-large-mnli', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: 'This is a test message.',
        parameters: {
          candidate_labels: ['test', 'production']
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      throw new Error(`API request failed with status ${response.status}: ${errorText}`);
    }

    const result = await response.json();
    console.log('Raw API response:', result);

    // Validate response format - expecting an object with sequence, labels, and scores
    if (!result || typeof result !== 'object' || !result.sequence || !Array.isArray(result.labels) || !Array.isArray(result.scores)) {
      console.error('Unexpected response format:', result);
      throw new Error('Invalid response format from Hugging Face API');
    }

    return NextResponse.json({
      success: true,
      message: 'Hugging Face API connection successful',
      testResult: result,
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