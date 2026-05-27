import { redirect } from 'next/navigation';
import MainUI from './client/main/_components/MainUI';

export default function Home() {
  //redirect('/client/intro');

  return (
    <MainUI />
  )
}
