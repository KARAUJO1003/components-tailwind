import { VariantProps, tv } from "tailwind-variants";

const tootipVariants = tv({
  slots: {
    base: "group",
    content: "cursor-pointer",	
    trigger: "invisible transition-all duration-300 group-hover:visible p-2 bg-black text-white rounded-md shadow-md text-xs whitespace-nowrap",
  },
})

interface TooltipProps extends React.HTMLAttributes<HTMLDivElement>, 
VariantProps<typeof tootipVariants> {}

const { base, content, trigger } = tootipVariants()

const Tooltip = ({ className, ...props }: TooltipProps) => {
  return (
    <div {...props} className={base({ className })} />
  )
}
const TooltipTrigger = ({ className, ...props }: TooltipProps) => {
  return (
    <div {...props} className={content({ className })} />
  )
}
const TooltipContent = ({ className, ...props }: TooltipProps) => {
  return (
    <div {...props} className={trigger({ className })} />
  )
}

export { Tooltip, TooltipTrigger, TooltipContent }