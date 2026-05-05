export async function onRequest(context) {
  const { searchParams } = new URL(context.request.url);
  const productId = searchParams.get('product_id');

  if (!productId) {
    return new Response(
      JSON.stringify({ error: 'Missing product_id parameter' }),
      {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  const rapidApiKey = context.env.RAPIDAPI_KEY;

  const url =
    'https://tiktok-data-api2.p.rapidapi.com/shop/detail-product' +
    '?product_id=' + productId;

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'x-rapidapi-host': 'tiktok-data-api2.p.rapidapi.com',
      'x-rapidapi-key': rapidApiKey,
    },
  });

  const data = await response.json();

  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' },
  });
}
