export async function GET(req: Request) {
  console.log('req', req);
  return new Response('hello world');
}
