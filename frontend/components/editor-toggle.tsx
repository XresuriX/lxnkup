"use client"

import { useEditor } from "@/components/craft/editor-provider"
import { Button } from "@/components/ui/button"
import { Edit, Save } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function EditorToggle() {
  const { enabled, toggleEnabled } = useEditor()

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed bottom-6 right-6 h-12 w-12 rounded-full shadow-lg z-50 bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={toggleEnabled}
          >
            {enabled ? <Save className="h-5 w-5" /> : <Edit className="h-5 w-5" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{enabled ? "Save changes" : "Edit page"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
