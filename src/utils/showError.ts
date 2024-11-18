import { toast } from "react-toastify"

export const showError = (err: any) => {
    if(err?.response?.data?.message) {
        toast.error(err?.response?.data?.message)
    }
}

export const showSuccess = (response: any) => {
    if(response?.data?.message) {
        toast.success(response?.data?.message)
    }
}