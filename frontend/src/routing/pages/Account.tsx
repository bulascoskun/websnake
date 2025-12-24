import { Button } from '@/components/ui/button';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import * as z from 'zod';
import { useAuthStore } from '@/store/useAuthStore';
import useApi from '@/hooks/useApi';

const formSchema = z.object({
  email: z
    .email('This is not a valid email.')
    .min(4, 'E-mail must be at least 4 characters.')
    .max(256, 'E-mail must be at most 256 characters.'),
  first_name: z
    .string()
    .min(2, 'First name must be at least 2 characters.')
    .max(32, 'First name must be at most 32 characters.'),
  last_name: z
    .string()
    .min(2, 'Last name must be at least 2 characters.')
    .max(32, 'Last name must be at most 32 characters.'),
});

const Account = () => {
  const user = useAuthStore((state) => state.user);
  const updateUser = useAuthStore((state) => state.updateUser);

  const { data, loading: loading, error: _err, execute } = useApi();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user?.email,
      first_name: user?.first_name,
      last_name: user?.last_name,
    },
  });

  const onSubmit = async (payload: z.infer<typeof formSchema>) => {
    await execute({
      method: 'POST',
      url: '/auth/update_user',
      data: payload,
    });

    updateUser({
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
    });

    toast.success('Update successful.');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>
          You can edit your account information here.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form id="form-login" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-12 gap-4 mb-4">
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="col-span-12 md:col-span-6 lg:col-span-4"
                >
                  <FieldLabel htmlFor="form-login-email">E-mail</FieldLabel>
                  <Input
                    {...field}
                    id="form-login-email"
                    aria-invalid={fieldState.invalid}
                    placeholder="E-mail."
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="first_name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="col-span-12 md:col-span-6 lg:col-span-4"
                >
                  <FieldLabel htmlFor="form-login-first_name">
                    First Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-login-first_name"
                    aria-invalid={fieldState.invalid}
                    placeholder="First Name"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="last_name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="col-span-12 md:col-span-6 lg:col-span-4"
                >
                  <FieldLabel htmlFor="form-login-last_name">
                    Last Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-login-last_name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Last Name"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
        </form>

        <CardAction>
          <Button type="submit" form="form-login" loading={loading}>
            Save
          </Button>
        </CardAction>
      </CardContent>
    </Card>
  );
};
export default Account;
