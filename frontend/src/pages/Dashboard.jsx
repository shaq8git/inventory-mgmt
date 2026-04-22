export default function Dashboard() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>

      {/* Cards */}
      <div className="grid grid-cols-3 gap-6">
        
        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-gray-500">Total Products</h3>
          <p className="text-2xl font-bold">120</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-gray-500">Stock Available</h3>
          <p className="text-2xl font-bold">850</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h3 className="text-gray-500">Pending Requests</h3>
          <p className="text-2xl font-bold">15</p>
        </div>

      </div>
    </div>
  );
}