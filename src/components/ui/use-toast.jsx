import * as React from "react";

const ToastContext = React.createContext({});

export function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const toast = React.useCallback(({ title, description, variant = "default" }) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { id, title, description, variant };
    
    setToasts((prevToasts) => [...prevToasts, newToast]);
    
    // Auto dismiss after 5 seconds
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
    }, 5000);
    
    return id;
  }, []);

  const dismiss = React.useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}
      {toasts.length > 0 && (
        <div className="fixed bottom-0 right-0 z-50 p-4 space-y-4 w-full max-w-md">
          {toasts.map((t) => (
            <div
              key={t.id}
              className={`rounded-lg border p-4 shadow-md ${t.variant === "destructive" ? "bg-red-50 border-red-200 text-red-800" : "bg-white border-gray-200"}`}
            >
              {t.title && <h4 className="font-medium">{t.title}</h4>}
              {t.description && <p className="text-sm mt-1">{t.description}</p>}
            </div>
          ))}
        </div>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  
  return context;
}