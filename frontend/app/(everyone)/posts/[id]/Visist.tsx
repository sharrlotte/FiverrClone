'use client'

import { visitPost } from "@/api/post.server-api";
import { useEffect } from "react"

export default function Visit({ id }: { id: string }) {
    useEffect(() => { visitPost(id); }, [id])

    return <></>
}
