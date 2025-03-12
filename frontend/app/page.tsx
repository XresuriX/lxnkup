"use client"
import App from "./components/newscene";
import HtmlText from "./components/ex1";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="bg-blue-400">hello world</div>

      <HtmlText/>

    </div>
  );
}
