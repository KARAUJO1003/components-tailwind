import {
  Modal,
  ModalContainer,
  ModalTrigger,
} from "@/components/ui/Modal/Modal";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/Tooltip";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center gap-4 p-4 bg-zinc-50 text-black">

      <div className="flex flex-col items-center justify-center w-full h-96 bg-gray-200 shadow-lg border rounded-lg"></div>
      <div className="flex flex-col items-center justify-center w-full h-96 bg-gray-200 shadow-lg border rounded-lg"></div>
      <div className="flex flex-col items-center justify-center w-full h-96 bg-gray-200 shadow-lg border rounded-lg"></div>
      <div className="flex flex-col items-center justify-center w-full h-96 bg-gray-200 shadow-lg border rounded-lg"></div>
      <div className="flex flex-col items-center justify-center w-full h-96 bg-gray-200 shadow-lg border rounded-lg"></div>
      <div className="flex flex-col items-center justify-center w-full h-96 bg-gray-200 shadow-lg border rounded-lg"></div>
      <div className="flex flex-col items-center justify-center w-full h-96 bg-gray-200 shadow-lg border rounded-lg"></div>
    </main>
  );
}
