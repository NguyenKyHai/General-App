// app/loading.tsx
export default function GlobalLoading() {
  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="p-4 bg-white rounded shadow animate-pulse">
        Loading...
      </div>
    </div>
  );
}
