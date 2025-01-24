export default function LoadingSpinner() {
  return (
    <div className="loading-spinner">
      <div className="spinner">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className={`line line-${index + 1}`}></div>
        ))}
      </div>
    </div>
  );
}
