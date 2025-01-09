import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { flashMessage } from '@/lib/utils';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { toast } from 'sonner';

export default function MemberCard({ action }) {
    const { data, setData, processing, errors, reset, post, recentlySuccessful } = useForm({
        email: '',
    });

    const onHandleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const onHandleSubmit = (e) => {
        e.preventDefault();
        post(action, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: (success) => {
                const flash = flashMessage(success);
                if (flash) toast[flash.type](flash.message);
            },
        });
    };

    return (
        <Card className="md:col-span-2">
            <CardContent>
                <form action="" onSubmit={onHandleSubmit}>
                    <div className="py-6">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="col-span-full">
                                <InputLabel htmlFor="email" value="Email" />
                                <TextInput
                                    type="email"
                                    name="email"
                                    id="email"
                                    isFocused={true}
                                    value={data.email}
                                    onChange={onHandleChange}
                                    onErrors={errors.email && <InputError message={errors.email} />}
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-end gap-x-2 py-6">
                            <Button type="button" variant="ghost" onClick={() => reset()}>
                                Reset
                            </Button>
                            <Button type="submit" variant="red" disabled={processing}>
                                Invite
                            </Button>
                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-muted-foreground">Invited.</p>
                            </Transition>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
