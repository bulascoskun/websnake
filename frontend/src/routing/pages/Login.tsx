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
import api from '@/api/axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';
import * as z from 'zod';
import { useAuthStore } from '@/store/useAuthStore';

const formSchema = z.object({
  email: z
    .email('This is not a valid email.')
    .min(4, 'E-mail must be at least 4 characters.')
    .max(256, 'E-mail must be at most 256 characters.'),
  password: z
    .string()
    .min(4, 'Password must be at least 4 characters.')
    .max(32, 'Password must be at most 32 characters.'),
});

const Login = () => {
  const login = useAuthStore((state) => state.login);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (payload: z.infer<typeof formSchema>) => {
    try {
      const { data } = await api.post('/auth/login', payload);
      login(data);
      toast.success('Login successful. You are being redirected.');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Toaster />
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>
            <span className="text-xl font-bold">Login</span>
          </CardTitle>
          <CardDescription>
            <Link to="/auth/register">
              Don't have an account? Click here to{' '}
              <span className="underline">register</span>.
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
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter>
          <Field orientation="horizontal">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button type="submit" form="form-login">
              Submit
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </>
  );
};
export default Login;
