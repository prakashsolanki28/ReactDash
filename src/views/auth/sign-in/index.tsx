import { LoaderCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';

import InputError from '@/components/ui/input-error';
import TextLink from '@/components/ui/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useAuth from '@/auth/useAuth';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};


const Login = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>();

    const { signIn } = useAuth()
    const onSubmit = async (data: LoginForm) => {
        const result = await signIn({ email: data.email, password: data.password })
        console.log(result)
    };

    return (
        <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input
                        id="email"
                        type="email"
                        required
                        autoFocus
                        tabIndex={1}
                        autoComplete="email"
                        placeholder="email@example.com"
                        {...register('email', { required: 'Email is required' })}
                    />
                </div>

                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                        <TextLink to={'/'} className="ml-auto text-sm" tabIndex={5}>
                            Forgot password?
                        </TextLink>
                    </div>
                    <Input
                        id="password"
                        type="password"
                        required
                        tabIndex={2}
                        autoComplete="current-password"
                        placeholder="Password"
                        {...register('password', { required: 'Password is required' })}
                    />
                    <InputError message={errors.password?.message || ''} />
                </div>

                <div className="flex items-center space-x-3">
                    <Checkbox
                        id="remember"
                        tabIndex={3}
                        defaultChecked={false}
                        {...register('remember')}
                    />
                    <Label htmlFor="remember">Remember me</Label>
                </div>

                <Button type="submit" className="mt-4 w-full" tabIndex={4} >
                    {isSubmitting ? <LoaderCircle className="h-4 w-4 animate-spin" /> : 'Log in'}
                </Button>
            </div>

            <div className="text-muted-foreground text-center text-sm">
                Don't have an account?{' '}
                <TextLink to={'/'} tabIndex={5}>
                    Sign up
                </TextLink>
            </div>
        </form>
    );
}

export default Login;