'use server';

export async function getEnv(): Promise<string> {
  try {
    const response = process.env.SECRET_API_KEY || 'NO_REY';
    return response;
  } catch (error) {
    console.error('Error fetching environemt variable...', error);
    return '';
  }
}

