import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
    id: string;
    type: ToastType;
    title: string;
    body?: string;
}

const ICONS = {
    success: <CheckCircle size={20} className="text-green-500 shrink-0" />,
    error: <XCircle size={20} className="text-red-500 shrink-0" />,
    info: <Info size={20} className="text-blue-500 shrink-0" />,
};

interface ToastItemProps {
    toast: ToastMessage;
    onDismiss: (id: string) => void;
}

export const ToastItem = ({ toast, onDismiss }: ToastItemProps) => {
    useEffect(() => {
        const t = setTimeout(() => onDismiss(toast.id), 4000);
        return () => clearTimeout(t);
    }, [toast.id, onDismiss]);

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="flex items-start gap-3 bg-white border border-light-grey rounded-2xl shadow-2xl px-5 py-4 min-w-[300px] max-w-sm pointer-events-auto"
        >
            {ICONS[toast.type]}
            <div className="flex-1 min-w-0">
                <p className="font-bold text-primary-black text-sm">{toast.title}</p>
                {toast.body && <p className="text-neutral-grey text-xs mt-0.5 leading-relaxed">{toast.body}</p>}
            </div>
            <button
                onClick={() => onDismiss(toast.id)}
                className="p-1 text-neutral-grey hover:text-primary-black rounded-full transition-colors shrink-0"
            >
                <X size={14} />
            </button>
        </motion.div>
    );
};

interface ToastContainerProps {
    toasts: ToastMessage[];
    onDismiss: (id: string) => void;
}

export const ToastContainer = ({ toasts, onDismiss }: ToastContainerProps) => (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence mode="popLayout">
            {toasts.map(t => (
                <ToastItem key={t.id} toast={t} onDismiss={onDismiss} />
            ))}
        </AnimatePresence>
    </div>
);

// Hook for easy usage
import { useState, useCallback } from 'react';

export const useToast = () => {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    const show = useCallback((type: ToastType, title: string, body?: string) => {
        const id = crypto.randomUUID();
        setToasts(prev => [...prev, { id, type, title, body }]);
    }, []);

    const dismiss = useCallback((id: string) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    return { toasts, dismiss, toast: { success: (t: string, b?: string) => show('success', t, b), error: (t: string, b?: string) => show('error', t, b), info: (t: string, b?: string) => show('info', t, b) } };
};
