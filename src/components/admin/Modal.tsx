"use client";

import { type ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizes = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
};

export function Modal({ open, onClose, title, children, size = "lg" }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full ${sizes[size]} max-h-[90vh] overflow-y-auto glass-card !p-0`}>
        <div className="sticky top-0 z-10 flex items-center justify-between p-5 border-b border-white/10 bg-background/95 backdrop-blur-sm">
          <h2 className="text-lg font-headline font-bold text-foreground">{title}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-muted hover:text-foreground transition-colors">
            ✕
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

interface ConfirmDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  message: string;
  confirmText?: string;
  confirmColor?: string;
}

export function ConfirmDialog({ open, onConfirm, onCancel, title, message, confirmText = "Sil", confirmColor = "bg-red-500 hover:bg-red-600" }: ConfirmDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[95] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative w-full max-w-sm glass-card !p-6">
        <h3 className="text-lg font-headline font-bold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
          <button onClick={onCancel} className="px-4 py-2 rounded-full text-sm text-muted hover:text-foreground hover:bg-white/10 transition-colors">
            İptal
          </button>
          <button onClick={onConfirm} className={`px-4 py-2 rounded-full text-sm text-white ${confirmColor} transition-colors`}>
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
