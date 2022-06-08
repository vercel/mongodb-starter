export default function AlertCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      data-testid="geist-icon"
      fill="none"
      height="24"
      shapeRendering="geometricPrecision"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width="24"
    >
      <circle cx="12" cy="12" r="10" fill="var(--geist-fill)" />
      <path d="M12 8v4" stroke="var(--geist-stroke)" />
      <path d="M12 16h.01" stroke="var(--geist-stroke)" />
    </svg>
  );
}
