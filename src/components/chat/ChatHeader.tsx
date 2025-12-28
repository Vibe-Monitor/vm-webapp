'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bot, PanelLeftClose, PanelLeft, Pencil, Check, X } from 'lucide-react';

interface ChatHeaderProps {
  title?: string | null;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  onRename?: (newTitle: string) => Promise<void>;
  className?: string;
}

export function ChatHeader({
  title,
  sidebarOpen,
  onToggleSidebar,
  onRename,
  className,
}: ChatHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const displayTitle = title || 'AI Assistant';

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleStartEdit = () => {
    if (!onRename) return;
    setEditValue(title || '');
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditValue('');
  };

  const handleSaveEdit = async () => {
    if (!onRename || !editValue.trim()) {
      handleCancelEdit();
      return;
    }

    setIsSaving(true);
    try {
      await onRename(editValue.trim());
      setIsEditing(false);
      setEditValue('');
    } catch {
      // Error is handled by the parent
    } finally {
      setIsSaving(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  return (
    <div
      className={cn(
        'flex items-center gap-2 px-4 py-3 border-b border-[var(--color-border)]',
        className
      )}
    >
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggleSidebar}
        className="h-8 w-8 p-0"
        title={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        {sidebarOpen ? (
          <PanelLeftClose className="h-4 w-4" />
        ) : (
          <PanelLeft className="h-4 w-4" />
        )}
      </Button>

      <div className="flex items-center gap-2 flex-1 min-w-0">
        <Bot className="h-5 w-5 shrink-0 text-[var(--color-primary)]" />

        {isEditing ? (
          <div className="flex items-center gap-1 flex-1 min-w-0">
            <Input
              ref={inputRef}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={() => {
                // Small delay to allow button clicks to register
                setTimeout(() => {
                  if (isEditing && !isSaving) {
                    handleCancelEdit();
                  }
                }, 150);
              }}
              placeholder="Enter conversation title"
              className="h-7 text-sm font-semibold"
              disabled={isSaving}
              maxLength={255}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSaveEdit}
              disabled={isSaving || !editValue.trim()}
              className="h-7 w-7 p-0 text-green-500 hover:text-green-600 hover:bg-green-500/10"
              title="Save"
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCancelEdit}
              disabled={isSaving}
              className="h-7 w-7 p-0 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]"
              title="Cancel"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-1 min-w-0 group">
            <h1 className="font-semibold text-[var(--color-text-primary)] truncate">
              {displayTitle}
            </h1>
            {onRename && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleStartEdit}
                className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)]"
                title="Rename conversation"
              >
                <Pencil className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
