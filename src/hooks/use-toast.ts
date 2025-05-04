
import {
  Toast,
  ToastActionElement,
  ToastProps,
} from '@/components/ui/toast';

import {
  useToast as useToastPrimitive,
} from '@radix-ui/react-toast';

type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

const TOAST_LIMIT = 5;
const TOAST_REMOVE_DELAY = 1000000;

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_VALUE;
  return count.toString();
}

const toasts: ToasterToast[] = [];

const listeners: ((toasts: ToasterToast[]) => void)[] = [];

function emitChange() {
  listeners.forEach((listener) => {
    listener(toasts);
  });
}

function addToast(toast: Omit<ToasterToast, "id">) {
  const id = genId();
  const newToast = { ...toast, id };
  
  toasts.push(newToast);
  emitChange();

  return id;
}

function dismissToast(toastId?: string) {
  const index = toastId ? toasts.findIndex((toast) => toast.id === toastId) : 0;

  if (index !== -1) {
    toasts.splice(index, 1);
    emitChange();
  }
}

export function useToast() {
  const hookProps = useToastPrimitive();

  function subscribe(listener: (toasts: ToasterToast[]) => void) {
    listeners.push(listener);
    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }

  return {
    ...hookProps,
    toasts,
    subscribe,
    toast: (props: Omit<ToasterToast, "id">) => addToast(props),
    dismiss: (toastId?: string) => dismissToast(toastId),
  };
}

export const toast = {
  toast: (props: Omit<ToasterToast, "id">) => addToast(props),
  dismiss: (toastId?: string) => dismissToast(toastId),
};
