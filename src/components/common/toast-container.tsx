"use client"
import { useApp } from "@/hooks/use-app"

export function ToastContainer() {
  const { toasts, removeToast } = useApp()

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`p-4 rounded-lg text-white animate-in fade-in slide-in-from-bottom-2 duration-300 pointer-events-auto cursor-pointer ${
            toast.type === "success" ? "bg-[#4CAF50]" : toast.type === "error" ? "bg-[#DC3545]" : "bg-[#666666]"
          }`}
          onClick={() => removeToast(toast.id)}
        >
          {toast.message}
        </div>
      ))}
    </div>
  )
}
