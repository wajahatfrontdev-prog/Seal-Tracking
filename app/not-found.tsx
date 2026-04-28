export default function NotFound() {
  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary-600 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-white mb-4">Page Not Found</h2>
        <p className="text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex items-center justify-center space-x-4">
          <a href="/" className="btn-primary">
            Go to Dashboard
          </a>
          <a href="/scan" className="btn-secondary">
            Open Scanner
          </a>
        </div>
      </div>
    </div>
  );
}
