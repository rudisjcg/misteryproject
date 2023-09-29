export async function POST(req, res) {
  const { title, description, email } = await req.json();
  console.log(title, description, email);
}
