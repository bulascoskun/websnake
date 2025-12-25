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
import { Field, FieldError } from '@/components/ui/field';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import useApi from '@/hooks/useApi';
import * as z from 'zod';
import type { CrawlPageData } from '@/types';

const formSchema = z.object({
  input: z.string().min(1, "You haven't asked anything"),
});

export function AddInsight({
  getList,
  crawlData,
}: {
  getList: () => void;
  crawlData: CrawlPageData[];
}) {
  const [open, setOpen] = useState(false);
  const { loading: loading, execute } = useApi();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: '',
    },
  });

  const onSubmit = async (payload: z.infer<typeof formSchema>) => {
    try {
      // await execute({
      //   method: 'POST',
      //   url: '/crawler/crawl',
      //   params: payload,
      // });
      setOpen(false);
      getList();
    } catch (error) {
      setOpen(false);
      console.error(error);
    }
  };

  return (
    <Dialog open={open}>
      <form id="form-insight" onSubmit={form.handleSubmit(onSubmit)}>
        <DialogTrigger asChild>
          <Button onClick={() => setOpen(true)}>Add Insight</Button>
        </DialogTrigger>

        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Add Insight</DialogTitle>
            <DialogDescription>
              You can ask anything you want about the site.{' '}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <Controller
              name="input"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <Input
                    {...field}
                    id="form-insight"
                    aria-invalid={fieldState.invalid}
                    placeholder="Ask anything"
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

            <Button type="submit" form="form-insight" loading={loading}>
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
