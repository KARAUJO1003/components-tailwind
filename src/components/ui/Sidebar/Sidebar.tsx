"use client";
import {
  ComponentProps,
  ElementType,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";
import { VariantProps, tv } from "tailwind-variants";
import { Button } from "../Button";
import { ChevronLeft, ChevronRight, LucideIcon, Menu, X } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import Link, { LinkProps } from "next/link";

type sideBarContextType = {
  open: boolean;
  onChangeToggle: () => void;
};

const SideBarContext = createContext<sideBarContextType>({
  open: false,
  onChangeToggle: () => {},
});

export const useSideBar = (): sideBarContextType => {
  const context = useContext(SideBarContext);
  if (context === undefined) {
    throw new Error("useSideBar must be used within a SideBarProvider");
  }
  return context;
};

const sideBarVariants = tv({
  slots: {
    base: "fixed inset-y-0 border-r left-0 shadow-2xl  md:relative bg-zinc-200 text-zinc-500  flex  flex-col justify-between transition-width duration-500",
    header: " bg-zinc-200 items-center justify-between md:p-4",
    title: "text-lg font-bold line-clamp-1",
    content: "flex flex-col overflow-y-auto h-full w-full  md:p-2",
    link: "group overflow-hidden hidden md:flex gap-2 flex-row items-center  text-sm py-2.5 px-4 rounded bg-zinc-300  text-zinc-600/80 font-semibold transition duration-200 hover:bg-gray-700 hover:text-zinc-200 ",
    linkName:
      "line-clamp-1 transition-all text-nowrap whitespace-nowrap duration-300",
    footer: "p-4  flex h-fit ",
  },
  variants: {
    open: {
      base: "w-64",
      link: "",
      header: "p-4 ",
      content: "p-2 flex flex-col h-full gap-2",
      linkName: "opacity-100 translate-x-0  text-nowrap",
    },
    closed: {
      base: "w-0 md:w-16",
      header: "p-4 ",
      content: "flex flex-col  h-full gap-2 md:p-2 ",
      link: "",
      linkName:
        "flex ml-2 -translate-x-3 opacity-0 transition-all duration-300 text-nowrap ",
    },
  },
});
const { base, header, title, link, linkName, content, footer } =
  sideBarVariants();

type SVProps = VariantProps<typeof sideBarVariants>;
interface SidebarProps extends ComponentProps<"div">, SVProps {}

const SidebarNav = ({
  className,
  open,
  closed,
  children,
  ...props
}: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pahtname = usePathname();
  const searchParams = useSearchParams();
  const sidebarQuery = searchParams.get("sidebar");

  const onChangeToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <SideBarContext.Provider value={{ open: isOpen, onChangeToggle }}>
      <Button
        size="icon"
        variant="destructive"
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-5 left-3 z-50 bg-zinc-900/20 backdrop-blur-md size-6 duration-800 transition-all"
      >
        {isOpen && <X className="size-4" />}{" "}
        {!isOpen && <Menu className="size-4" />}
      </Button>

      <div
        {...props}
        className={base({
          className,
          ...(isOpen ? { open: "base" } : { closed: "base" }),
        })}
      >
        <Button
          variant="destructive"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="absolute size-6 top-5 -right-3 text-zinc-200 rounded-full hidden md:flex bg-zinc-900/20 backdrop-blur-md"
        >
          {isOpen && <ChevronLeft className="size-4" />}
          {!isOpen && <ChevronRight className="size-4" />}
        </Button>
        {children}
      </div>
    </SideBarContext.Provider>
  );
};

const SidebarNavHeader = ({
  className,
  ...props
}: ComponentProps<"header"> & SVProps) => {
  const { open: isOpen } = useSideBar();
  return <header {...props} className={
    sideBarVariants.variants[isOpen ? "open" : "closed"].header
  } />;
};
const SidebarNavContent = ({
  className,
  ...props
}: ComponentProps<"nav"> & SVProps) => {
  const { open: isOpen } = useSideBar();

  return <nav {...props} className={
    sideBarVariants.variants[isOpen ? "open" : "closed"].content
  } />;
};
const SidebarNavTitle = ({
  className,
  ...props
}: ComponentProps<"h2"> & SVProps) => {
  return <header {...props} className={title({ className })} />;
};

type SidebarNavlinkProps = LinkProps &
  SVProps &
  ComponentProps<"a"> & {
    active?: boolean;
    className?: string;
    Icon?: ReactNode;
  };

const SidebarNavlink = ({
  className,
  children,
  Icon,
  ...props
}: SidebarNavlinkProps) => {
  const { open: isOpen } = useSideBar();
  console.log(isOpen);
  return (
    <Link {...props} className={link()}>
      {Icon && Icon}
      <span
        {...props}
        className={
          sideBarVariants.variants[isOpen ? "open" : "closed"].linkName
        }
      >
        {children}
      </span>
    </Link>
  );
};

const SidebarNavFooter = ({
  className,
  ...props
}: ComponentProps<"footer"> & SVProps) => {
  return <header {...props} className={footer({ className })} />;
};

export {
  SidebarNav,
  SidebarNavHeader ,
  SidebarNavTitle ,
  SidebarNavContent,
  SidebarNavlink,
  SidebarNavFooter,
};
