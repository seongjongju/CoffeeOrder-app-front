'use client'
import Image from 'next/image';
import { useState, useEffect } from 'react'
import BigMascot from '@/public/icons/big_mascot.png';
import "@/app/client/intro/_styled/intro.css";
interface SplashScreenProps {
  children: React.ReactNode;
  initialHasSeen?: boolean;
}

export default function SplashScreen({ children, initialHasSeen = false }: SplashScreenProps) {
  const [isLoading, setIsLoading] = useState(!initialHasSeen);

  useEffect(() => {
    if (initialHasSeen) return;

    const timer = setTimeout(() => {
      document.cookie = "hasSeenSplash=true; path=/;";
      setIsLoading(false);
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