import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router';
import * as z from 'zod';

const formSchema = z.object({
  email: z
    .string()
    .min(4, 'E-mail must be at least 4 characters.')
    .max(16, 'E-mail must be at most 16 characters.'),
  username: z
    .string()
    .min(4, 'Username must be at least 4 characters.')
    .max(16, 'Username must be at most 16 characters.'),
  password: z
    .string()
    .min(4, 'Password must be at least 4 characters.')
    .max(16, 'Password must be at most 16 characters.'),
  rePassword: z
    .string()
    .min(4, 'Password must be at least 4 characters.')
    .max(16, 'Password must be at most 16 characters.'),
});

const Login = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
      rePassword: '',
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    console.log(data);
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>
          <span className="text-xl font-bold">Register</span>
        </CardTitle>
        <CardDescription>
          <Link to="/auth/login">
            Already have an account? Click here to{' '}
            <span className="underline">login</span>.
          </Link>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form id="form-login" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-login-email">E-mail</FieldLabel>
                  <Input
                    {...field}
                    id="form-login-email"
                    aria-invalid={fieldState.invalid}
                    placeholder="Please enter your E-mail."
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-login-username">
                    Username
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-login-username"
                    aria-invalid={fieldState.invalid}
                    placeholder="Please enter your username."
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-login-password">
                    Password
                  </FieldLabel>

                  <Input
                    {...field}
                    id="form-login-password"
                    type="password"
                    placeholder="Please enter your password."
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="rePassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-login-repassword">
                    Re-enter your password
                  </FieldLabel>

                  <Input
                    {...field}
                    id="form-login-repassword"
                    type="password"
                    placeholder="Please re-enter your password."
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-login">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
};
export default Login;
