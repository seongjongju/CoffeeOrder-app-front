'use client'
import Image from 'next/image';
import { useState, useEffect } from 'react'
import BigMascot from '@/public/icons/big_mascot.png';
import "@/app/client/intro/_styled/intro.css";

export default function SplashScreen({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');

    if (hasSeenSplash) {
      setIsLoading(false)
      return
    }

    const timer = setTimeout(() => {
      sessionStorage.setItem('hasSeenSplash', 'true')
      setIsLoading(false)
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
        <div className='intro-container'>
            <Image className='intro-image' src={BigMascot} alt='머그컵 캐릭터' />
        </div>
    )
  }

  return <>{children}</>
}