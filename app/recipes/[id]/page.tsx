export default async function RecipePage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Recipe Details</h1>
      <p>Displaying recipe for ID: <strong>{id}</strong></p>
      
      {/* This is where you would fetch your data using the ID */}
    </main>
  );
}