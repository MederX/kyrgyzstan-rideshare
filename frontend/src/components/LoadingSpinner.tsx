export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-screen bg-tg-bg">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-tg-blue" />
    </div>
  );
}
