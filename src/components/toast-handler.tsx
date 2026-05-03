"use client"
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

export function ToastHandler(){
    const searchParams = useSearchParams();
    const shown = useRef(false);


    useEffect(() => {
        if(shown.current) return;

        if(searchParams.get('success')){
            toast.success('Message sent successfully!');
            shown.current = true;
        }
        if(searchParams.get('error')){

            toast.error('Something went wrong!');
            shown.current = false;
        }
    },[searchParams])

    return null;
}