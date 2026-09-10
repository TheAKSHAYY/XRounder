import { useState, useEffect } from "react";
import { AlertTriangle, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export interface TypedConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: React.ReactNode;
  targetResourceName: string;
  inputLabel?: string;
  requireReason?: boolean;
  reasonLabel?: string;
  confirmButtonText?: string;
  destructive?: boolean;
  isLoading?: boolean;
  onConfirm: (reason?: string) => Promise<void> | void;
}

export function TypedConfirmationDialog({
  open,
  onOpenChange,
  title,
  description,
  targetResourceName,
  inputLabel,
  requireReason = false,
  reasonLabel = "Reason for this action (recorded in audit log):",
  confirmButtonText = "Confirm",
  destructive = true,
  isLoading = false,
  onConfirm,
}: TypedConfirmationDialogProps) {
  const [typedInput, setTypedInput] = useState("");
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      setTypedInput("");
      setReason("");
      setSubmitting(false);
    }
  }, [open]);

  const cleanTarget = targetResourceName?.trim() ?? "";
  const matches = cleanTarget.length > 0 && typedInput.trim() === cleanTarget;
  const reasonValid = !requireReason || reason.trim().length > 0;
  const canConfirm = matches && reasonValid && !isLoading && !submitting;

  const handleConfirm = async () => {
    if (!canConfirm) return;
    try {
      setSubmitting(true);
      await onConfirm(reason.trim() || undefined);
      onOpenChange(false);
    } catch {
      // Handled by caller's toast/error state
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2">
            {destructive && (
              <div className="grid h-8 w-8 place-items-center rounded-lg bg-destructive/10 text-destructive">
                <AlertTriangle className="h-4 w-4" />
              </div>
            )}
            <DialogTitle className="text-base font-semibold">{title}</DialogTitle>
          </div>
          <DialogDescription className="text-sm text-muted-foreground pt-1">
            {description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {requireReason && (
            <div className="space-y-1.5">
              <Label htmlFor="action-reason" className="text-xs font-medium">
                {reasonLabel}
              </Label>
              <Input
                id="action-reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Enter justification..."
                className="h-9 text-xs"
                disabled={isLoading || submitting}
              />
            </div>
          )}

          <div className="space-y-1.5 rounded-lg border border-border/70 bg-muted/40 p-3">
            <Label htmlFor="typed-confirmation" className="text-xs font-medium text-foreground">
              {inputLabel ?? (
                <>
                  To confirm, type <span className="font-mono font-bold text-foreground underline select-all">{targetResourceName}</span> below:
                </>
              )}
            </Label>
            <Input
              id="typed-confirmation"
              value={typedInput}
              onChange={(e) => setTypedInput(e.target.value)}
              placeholder={targetResourceName}
              className="font-mono text-xs h-9 bg-background"
              disabled={isLoading || submitting}
              autoComplete="off"
            />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
            disabled={isLoading || submitting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant={destructive ? "destructive" : "default"}
            size="sm"
            disabled={!canConfirm}
            onClick={handleConfirm}
          >
            {(isLoading || submitting) && <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />}
            {confirmButtonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
