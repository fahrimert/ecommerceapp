"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown, MenuIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const AccordionPaid = AccordionPrimitive.Root

const AccordionItemPaid = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
))
AccordionItemPaid.displayName = "AccordionItem"

const AccordionTriggerPaid = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        " w-full h-full flex flex-row  items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
    
    <div className=" w-full h-full flex flex-row items-center justify-center">
      <MenuIcon width={65} height={50}/>
      <div>


      </div>
      {children}
    </div>
      <ChevronDown className="h-full w-45 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTriggerPaid.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContentPaid = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
))

AccordionContentPaid.displayName = AccordionPrimitive.Content.displayName

export { AccordionPaid, AccordionItemPaid, AccordionTriggerPaid, AccordionContentPaid }
