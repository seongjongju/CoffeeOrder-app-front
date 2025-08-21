import MainVisual from "@/features/home/components/MainVisual";
import NewAndHotSection from "@/features/home/components/NewAndHotSection";
import StampSection from "@/features/home/components/StampSection";
import NoticeSection from "@/features/home/components/NoticeSection";

export default function Home() {
  return (
    <div>
      <main>
        <MainVisual />
        <StampSection />
        <NewAndHotSection />
        <NoticeSection />
      </main>
    </div>
  );
}
