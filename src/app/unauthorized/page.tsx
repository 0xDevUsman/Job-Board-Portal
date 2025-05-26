export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-3xl md:text-4xl font-bold text-red-600">
        403 - Access Denied
      </h1>
      <p className="mt-4 text-base md:text-lg mb-10">
        You do not have permission to access this page.
      </p>
    </div>
  );
}
