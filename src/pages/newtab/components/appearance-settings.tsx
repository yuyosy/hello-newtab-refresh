import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAppearanceModal } from '@/hooks/use-appearance-modal';

export function AppearanceSettings() {
  const { isOpen, close } = useAppearanceModal();

  // TODO: Change implementation
  //
  // refer to: https://github.com/radix-ui/primitives/issues/2356
  //
  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Appearance</DialogTitle>
          <DialogDescription>Customize appearance</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>Overall Theme</div>
          <div>Theme Style</div>
          <div>Theme Color</div>
          <div>Theme Config</div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
