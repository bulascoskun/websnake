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
    .email('This is not a valid email.')
    .min(4, 'E-mail must be at least 4 characters.')
    .max(256, 'E-mail must be at most 256 characters.'),
  name: z
    .string()
    .min(4, 'Name must be at least 4 characters.')
    .max(32, 'Name must be at most 32 characters.'),
  lastName: z
    .string()
    .min(4, 'Last name must be at least 4 characters.')
    .max(32, 'Last name must be at most 32 characters.'),
  password: z
    .string()
    .min(4, 'Password must be at least 4 characters.')
    .max(32, 'Password must be at most 32 characters.'),
  rePassword: z
    .string()
    .min(4, 'Password must be at least 4 characters.')
    .max(32, 'Password must be at most 32 characters.'),
});

const Login = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      name: '',
      lastName: '',
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
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-login-name">Name</FieldLabel>
                  <Input
                    {...field}
                    id="form-login-name"
                    aria-invalid={fieldState.invalid}
                    placeholder="Please enter your name."
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="lastName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-login-lastname">
                    Last Name
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-login-lastname"
                    aria-invalid={fieldState.invalid}
                    placeholder="Please enter your last name."
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
