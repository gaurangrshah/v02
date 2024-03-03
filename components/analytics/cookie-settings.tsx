"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { X } from "lucide-react"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "../ui/button"
import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { consentUpdateEvent, getCookies } from "./utils"
import { adCookies, defaultCookies, } from "./constants"
import { useCallback, useEffect, useState } from "react"


export function CookieSettings() {
  return (
    <Drawer shouldScaleBackground>
      <DrawerTrigger asChild>
        <Button variant="link" size="sm">
          <p className="text-gray-800 text-sm">Manage cookie settings.</p>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="container max-w-4xl pb-24 bg-opacity-30">
        <DrawerHeader className="relative">
          <DrawerClose asChild>
            <Button variant="outline" size="icon" className="absolute top-0 right-0 hover:bg-red-300"><X /></Button>
          </DrawerClose>
          <DrawerTitle>Customize your preferences.</DrawerTitle>
          <DrawerDescription>You can manage these settings at anytime from the
            <Button variant="link" size="sm" className="pl-1"><Link href="#/policies/cookies"> Cookie Policy</Link></Button>.</DrawerDescription>
        </DrawerHeader>
        <CookeOptionsForm />
        <DrawerFooter className="">
          <DrawerClose asChild>
            <Button variant="outline" size="sm">Done</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>

  )
}

export function CookeOptionsForm() {
  return (
    <Card className="w-full max-w-4xl mx-auto ">
      <CardHeader>
        <div className="space-y-2">
          <CardTitle>Cookie Consent</CardTitle>
          <CardDescription>
            Please review and accept our use of cookies. You can manage your preferences at any time.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <DefaultCookieOption
          category="Necessary"
          description="These cookies are essential for the website to function properly. They are used for things like saving your preferences to your browser and managing secure authentication."
        />
        <CookieOption
          category="Ads & Analytics"
          description="These cookies help us to understand how you interact with the website and deliver relevant marketing messages to you.."
        />
      </CardContent>
    </Card>
  )
}


type CookeOptionsProps = {
  category: string;
  description: string;
}

function DefaultCookieOption({ category, description,
  // permissions
}: Omit<CookeOptionsProps, 'onParentCheckedChange' | 'onCheckedChange'>) {

  const permissions = defaultCookies.reduce((acc, cookie) => ({ ...acc, [cookie]: true }), {})

  return (
    <div className="flex items-start space-x-4 border rounded-md py-6 px-4">
      <Switch
        className="mt-1 data-[state=checked]:disabled:bg-secondary disabled:hover:opacity-30"
        id={category}
        defaultChecked={true}
        disabled={true}
      />
      <div className="space-y-1.5 max-w-xl">
        <Label htmlFor={category}>{category}</Label>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
        <Accordion type="single" collapsible className="pt-6px-3 rounded-md">
          <AccordionItem value={category}>
            <AccordionTrigger className="text-xs text-foreground/80 mt-4">
              Show Details
            </AccordionTrigger>
            <AccordionContent className="bg-gray-100">
              <ul>
                {Object.keys(permissions)?.length && Object.keys(permissions).map((permission) => {
                  return (
                    <li key={permission} className="border-b last-of-type:border-none py-2">
                      <div className="flex items-center space-x-4 pt-2 px-4">
                        <Switch
                          id={permission}
                          className="mt-1 data-[state=checked]:disabled:bg-secondary disabled:hover:opacity-30 scale-75"
                          defaultChecked={permissions[permission as keyof typeof permissions]}
                          disabled={true} // disable by default
                        />
                        <div className="space-y-1.5 flex">
                          <Label htmlFor={permission}>{permission}</Label>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}


// @TODO: Add toast notification for user feedback
function CookieOption({
  category,
  description,
}: Omit<CookeOptionsProps, 'enabled'>) {


  const [options, setOptions] = useState(getCookies(adCookies, true))
  const [allActive, setAllActive] = useState(Object.values(options).every(Boolean))

  const updateSingleOption = useCallback((key: string, value: boolean) => {
    setOptions({ ...options, [key]: value })
  }, [options])

  const updateAllOptions = useCallback((value: boolean) => {
    setOptions(Object.keys(options).reduce((acc, key) => ({ ...acc, [key]: value }), {}))
    setAllActive(value)
  }, [options])

  useEffect(() => {
    setAllActive(Object.values(options).every(Boolean))
    consentUpdateEvent(options, true)
  }, [options])

  return (
    <div className="flex items-start space-x-4 border rounded-md py-6 px-4">
      <Switch
        className="mt-1 data-[state=checked]:disabled:bg-secondary disabled:hover:opacity-30"
        id={category}
        checked={allActive}
        disabled={false}
        onCheckedChange={(checked) => {
          updateAllOptions(checked)
        }}
      />
      <div className="space-y-1.5 max-w-xl">
        <Label htmlFor={category}>{category}</Label>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
        <Accordion type="single" collapsible className="pt-6px-3 rounded-md">
          <AccordionItem value={category}>
            <AccordionTrigger className="text-xs text-foreground/80 mt-4">
              Show Details
            </AccordionTrigger>
            <AccordionContent className="bg-gray-100">
              <ul>
                {Object.keys(options)?.length && Object.keys(options).map((option) => {
                  return (
                    <li key={option} className="border-b last-of-type:border-none py-2">
                      <div className="flex items-center space-x-4 pt-2 px-4">
                        <Switch
                          id={option}
                          className="mt-1 data-[state=checked]:disabled:bg-secondary disabled:hover:opacity-30 scale-75"
                          defaultChecked={allActive}
                          checked={options[option as keyof typeof options]}
                          onCheckedChange={(checked) => {
                            updateSingleOption(option, checked)
                          }}
                        />
                        <div className="space-y-1.5 flex">
                          <Label htmlFor={option}>{option}</Label>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}
