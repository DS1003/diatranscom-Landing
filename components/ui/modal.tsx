"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "reicon-react";

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={onClose}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className="admin-scrollbar fixed left-[50%] top-[50%] z-50 w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] gap-4 border border-white/20 bg-white/95 backdrop-blur-3xl p-8 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-3xl max-h-[90vh] overflow-y-auto">
          <div className="flex flex-col space-y-2 text-center sm:text-left mb-8">
            <DialogPrimitive.Title className="text-2xl font-black text-gray-900 tracking-tight">
              {title}
            </DialogPrimitive.Title>
            {description && (
              <DialogPrimitive.Description className="text-sm font-medium text-gray-500">
                {description}
              </DialogPrimitive.Description>
            )}
          </div>
          
          {children}
          
          <DialogPrimitive.Close className="absolute right-6 top-6 rounded-full w-8 h-8 flex items-center justify-center bg-gray-100/50 hover:bg-gray-200 text-gray-500 hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-500">
            <X size={16} />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
