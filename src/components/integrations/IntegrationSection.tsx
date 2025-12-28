"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import { IntegrationConfig } from "@/types/integration";

interface IntegrationSectionProps extends IntegrationConfig {
  value: string;
  defaultValue?: string;
}

export function IntegrationSection({
  title,
  icon,
  description,
  connected,
  loading,
  fields,
  onConnect,
  onDisconnect,
  statusComponent,
  instructions,
  timeEstimate,
  value,
  defaultValue,
}: IntegrationSectionProps) {
  return (
    <Accordion type="single" collapsible defaultValue={defaultValue} className="w-full">
      <AccordionItem value={value} className="border-none">
        <div className="rounded-lg border bg-secondary border-border">
          <AccordionTrigger className="p-4 sm:p-6 hover:no-underline [&[data-state=open]]:pb-0">
            <div className="flex flex-row justify-between items-center w-full gap-2">
              <div className="flex flex-row items-center gap-3 sm:gap-4 min-w-0">
                {connected ? (
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-muted-foreground" />
                ) : (
                  <Circle className="w-5 h-5 flex-shrink-0 text-muted-foreground opacity-40" />
                )}
                <div className="flex flex-row items-center gap-2 sm:gap-3 min-w-0">
                  {icon}
                  <span className="text-sm sm:text-[16px] font-semibold leading-5 tracking-tight truncate text-foreground">
                    {title}
                  </span>
                </div>
              </div>
              <span className="text-xs sm:text-sm leading-5 tracking-tight flex-shrink-0 text-muted-foreground">
                {timeEstimate}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 sm:px-16 lg:px-[92px] pb-6 pt-2">
            <div className="flex flex-col items-start gap-4 sm:gap-[22px]">
              <p className="text-xs sm:text-sm leading-5 tracking-tight text-muted-foreground">
                {description}
              </p>

              {/* Status Component (if provided) */}
              {statusComponent}

              {/* Input Fields (if not connected and fields provided) */}
              {!connected && fields.length > 0 && (
                <>
                  {fields.map((field, index) => (
                    <div key={index} className="flex flex-col items-start gap-2 w-full">
                      <label className="text-sm leading-5 tracking-tight text-foreground">
                        {field.label}
                      </label>
                      {field.description && (
                        <p className="text-xs leading-4 -mt-1 text-muted-foreground">
                          {field.description}
                        </p>
                      )}
                      <Input
                        type={field.type || "text"}
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        placeholder={field.placeholder}
                        className="w-full h-9 px-3 py-1 text-sm rounded-md"
                      />
                    </div>
                  ))}
                </>
              )}

              {/* Connect/Disconnect Button */}
              {connected ? (
                <Button
                  onClick={onDisconnect}
                  variant="outline"
                  className="h-10 px-5 rounded-md text-sm font-medium transition-all duration-300 bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-500/50"
                >
                  Remove Integration
                </Button>
              ) : (
                <Button
                  onClick={onConnect}
                  disabled={loading}
                  className="h-10 px-5 rounded-md text-sm font-medium transition-all duration-300"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Connecting...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      {icon}
                      Connect {title}
                    </span>
                  )}
                </Button>
              )}

              {/* Instructions (if provided and not connected) */}
              {!connected && instructions}
            </div>
          </AccordionContent>
        </div>
      </AccordionItem>
    </Accordion>
  );
}
