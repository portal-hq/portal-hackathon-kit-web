import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { usePortal } from "@/providers/portal";
import { useEffect } from "react";


export default function Home() {
  const portal = usePortal()

  useEffect(() => {
    (
      async () => {
        const res = await fetch('/api/getSolanaAssets')
        console.log(res)
      }
    )()
  }, [])

  return (
    <>
    lmao
    </>
  )
}
