'use client';
import Intro from "@/shared/components/intro/Intro";
import { useAppSelector } from "@/store/hook";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const auth = useAppSelector(state => state.auth);

  useEffect(() => {
    if(auth.isLoggedIn) {
      setTimeout(() => {
          router.push('/main');
      }, 2000);
    }
  },[auth.isLoggedIn]);

  return (
    <>
      <Intro 
        isLoggedIn={auth.isLoggedIn}
      /> 
    </>
  );
}
