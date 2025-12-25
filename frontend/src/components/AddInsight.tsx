import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useState } from 'react';
import useApi from '@/hooks/useApi';
import * as z from 'zod';

const formSchema = z.object({
  url: z
    .url('This is not a valid url.')
    .max(256, 'E-mail must be at most 256 characters.'),
});

export function AddInsight({ getList }: { getList: () => void }) {
  const [open, setOpen] = useState(false);
  const { loading: loading, execute } = useApi();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: '',
    },
  });

  const onSubmit = async (payload: z.infer<typeof formSchema>) => {
    try {
      await execute({
        method: 'POST',
        url: '/crawler/crawl',
        params: payload,
      });
      toast.success(
        'You have successfully added a domain to crawl. It might take a while to crawl.'
      );
      setOpen(false);
      getList();
    } catch (error) {
      setOpen(false);
      console.error(error);
    }
  };

  return (
    <Dialog open={open}>
      <form id="form-url" onSubmit={form.handleSubmit(onSubmit)}>
        <DialogTrigger asChild>
          <Button onClick={() => setOpen(true)}>Add Domain</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-106.25" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Add Domain</DialogTitle>
            <DialogDescription>
              Enter the domain url you want to crawl.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <Controller
              name="url"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-url">URL</FieldLabel>
                  <Input
                    {...field}
                    id="form-url"
                    aria-invalid={fieldState.invalid}
                    placeholder="Please enter URL"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={() => setOpen(false)} variant="outline">
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" form="form-url" loading={loading}>
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
