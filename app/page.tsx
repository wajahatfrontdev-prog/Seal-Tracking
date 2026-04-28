export default function Home() {
  return (
    <div className="min-h-screen bg-dark-950 p-4 sm:p-6 pt-16 lg:pt-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Shipping Dashboard</h2>
            <p className="text-gray-400 text-sm sm:text-base">Track and manage security seals</p>
          </div>

          <div className="flex items-center space-x-3">
            <button className="btn-secondary text-sm sm:text-base">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="hidden sm:inline">Search</span>
            </button>
            <button className="btn-primary text-sm sm:text-base">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="hidden sm:inline">New Shipment</span>
              <span className="sm:hidden">New</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-6 sm:mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm mb-1">Total Shipments</p>
                <p className="text-xl sm:text-2xl font-bold text-white">248</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-600/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm mb-1">In Transit</p>
                <p className="text-xl sm:text-2xl font-bold text-white">42</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm mb-1">Delivered</p>
                <p className="text-xl sm:text-2xl font-bold text-white">189</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-xs sm:text-sm mb-1">Active Seals</p>
                <p className="text-xl sm:text-2xl font-bold text-white">156</p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Shipments */}
        <div className="card">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl font-semibold text-white">Recent Shipments</h3>
            <button className="text-primary-500 hover:text-primary-400 text-xs sm:text-sm">View All</button>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {[
              { id: 'DEZ389', status: 'In Delivery', truck: 'Scania R2009', location: 'New Trendyol Cr. State, Report 81063' },
              { id: 'DEZ294', status: 'At Hub Surat', truck: 'MAN TGX', location: 'Hub Location' },
              { id: 'DEZ305', status: 'Pending', truck: 'Volvo FH Classic', location: 'New Trendyol Cr. State, Report 81063' },
              { id: 'DEZ782', status: 'In Delivery', truck: 'MAN TGX', location: 'New Trendyol Cr. State, Report 81063' },
            ].map((shipment, index) => (
              <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-dark-800 rounded-lg hover:bg-dark-700 transition-colors cursor-pointer gap-3">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-dark-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm sm:text-base">#{shipment.id}</p>
                    <p className="text-gray-400 text-xs sm:text-sm">{shipment.truck}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end sm:space-x-6 pl-13 sm:pl-0">
                  <div className="text-left sm:text-right">
                    <p className="text-gray-400 text-xs sm:text-sm">Location</p>
                    <p className="text-white text-xs sm:text-sm line-clamp-1">{shipment.location}</p>
                  </div>
                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                    shipment.status === 'In Delivery' ? 'bg-green-600/20 text-green-400' :
                    shipment.status === 'At Hub Surat' ? 'bg-primary-600/20 text-primary-400' :
                    'bg-yellow-600/20 text-yellow-400'
                  }`}>
                    {shipment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
