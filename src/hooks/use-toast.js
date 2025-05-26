"use client"

import { useState, useCallback } from "react"

// Simple toast hook for demonstration purposes
export function useToast() {
  const [toasts, setToasts] = useState([])

  const toast = useCallback(({ title, description }) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast = {
      id,
      title,
      description,
    }

    setToasts((prevToasts) => [...prevToasts, newToast])

    // Auto dismiss after 3 seconds
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
    }, 3000)

    return id
  }, [])

  const dismiss = useCallback((id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }, [])

  return { toasts, toast, dismiss }
}
