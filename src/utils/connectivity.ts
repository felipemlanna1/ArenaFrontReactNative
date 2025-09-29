interface RetryOptions {
  maxRetries: number;
  retryOn: number[];
  retryDelay?: number;
}

export const withRetry = async <T>(
  operation: () => Promise<T>,
  options: RetryOptions
): Promise<T> => {
  const { maxRetries, retryOn, retryDelay = 1000 } = options;
  let attempt = 0;

  while (attempt <= maxRetries) {
    try {
      return await operation();
    } catch (error: any) {
      const shouldRetry =
        attempt < maxRetries &&
        (retryOn.includes(0) ||
         (error?.response?.status && retryOn.includes(error.response.status)) ||
         (error?.code === 'NETWORK_ERROR' && retryOn.includes(0)));

      if (!shouldRetry) {
        throw error;
      }

      attempt++;
      await new Promise(resolve => setTimeout(resolve, retryDelay * attempt));
    }
  }

  throw new Error('Max retries exceeded');
};