import { IoAlertCircle } from "react-icons/io5";

interface ErrorMessageProps {
  error: string;
}

export function ErrorMessage({ error }: ErrorMessageProps) {
  return (
    <div className="glass mb-6 rounded-xl border border-red-500/40 bg-red-500/10 p-4 backdrop-blur-lg">
      <div className="flex items-center gap-3">
        <IoAlertCircle className="flex-shrink-0 text-xl text-red-400" />
        <p className="text-red-200">{error}</p>
      </div>
    </div>
  );
}
