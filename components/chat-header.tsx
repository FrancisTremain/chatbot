'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useWindowSize } from 'usehooks-ts';

import { ModelSelector } from '@/components/model-selector';
import { SidebarToggle } from '@/components/sidebar-toggle';
import { Button } from '@/components/ui/button';
import { PlusIcon, SidebarLeftIcon } from './icons';
import { useSidebar } from './ui/sidebar';
import { memo } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';
import { VisibilityType, VisibilitySelector } from './visibility-selector';

function PureChatHeader({
  chatId,
  selectedModelId,
  selectedVisibilityType,
  isReadonly,
}: {
  chatId: string;
  selectedModelId: string;
  selectedVisibilityType: VisibilityType;
  isReadonly: boolean;
}) {
  const router = useRouter();
  const { open, toggleSidebar } = useSidebar();
  const { width: windowWidth } = useWindowSize();

  return (
    <>
      {/* Fixed position sidebar toggle button that stays in the same place */}
      <div className="fixed left-2 top-1.5 z-50">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={toggleSidebar}
              variant="outline"
              className="md:px-2 md:h-fit"
              aria-label="Toggle Sidebar"
            >
              <div className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
                <SidebarLeftIcon size={16} />
              </div>
            </Button>
          </TooltipTrigger>
          <TooltipContent align="start">Toggle Sidebar (Ctrl+B)</TooltipContent>
        </Tooltip>
      </div>

      <header className="flex sticky top-0 bg-background py-1.5 items-center gap-2 pl-14 pr-2">
        {/* New Chat button */}
        {(!open || windowWidth < 768) && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className="md:px-2 md:h-fit"
                onClick={() => {
                  router.push('/');
                  router.refresh();
                }}
              >
                <PlusIcon />
                <span className="md:sr-only">New Chat</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>New Chat</TooltipContent>
          </Tooltip>
        )}

        {!isReadonly && (
          <ModelSelector
            selectedModelId={selectedModelId}
            className="md:ml-0"
          />
        )}

        {!isReadonly && (
          <VisibilitySelector
            chatId={chatId}
            selectedVisibilityType={selectedVisibilityType}
            className="ml-auto"
          />
        )}
      </header>
    </>
  );
}

export const ChatHeader = memo(PureChatHeader, (prevProps, nextProps) => {
  return prevProps.selectedModelId === nextProps.selectedModelId;
});
