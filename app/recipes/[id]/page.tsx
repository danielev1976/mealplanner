export default async function RecipePage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-white">Recipe Details</h1>
      <p>Displaying recipe for ID: <strong>{id}</strong></p>
      
      {/* This is where you would fetch your data using the ID */}
    </main>
  );
}