import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { flashMessage } from '@/lib/utils';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { toast } from 'sonner';

export default function AttachmentCard({ action }) {
    const { data, setData, processing, errors, reset, post, recentlySuccessful } = useForm({
        file: '',
        link: '',
        name: '',
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
                                <InputLabel htmlFor="file" value="File" />
                                <TextInput
                                    type="file"
                                    name="file"
                                    id="file"
                                    onChange={(e) => setData(e.target.name, e.target.files[0])}
                                    onErrors={errors.file && <InputError message={errors.file} />}
                                />
                            </div>

                            <div className="col-span-full">
                                <InputLabel htmlFor="link" value="Link" />
                                <TextInput
                                    type="url"
                                    name="link"
                                    id="link"
                                    value={data.link}
                                    onChange={onHandleChange}
                                    onErrors={errors.link && <InputError message={errors.link} />}
                                />
                            </div>

                            <div className="col-span-full">
                                <InputLabel htmlFor="name" value="Name" />
                                <TextInput
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={data.name}
                                    onChange={onHandleChange}
                                    onErrors={errors.name && <InputError message={errors.name} />}
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-end gap-x-2 py-6">
                            <Button type="button" variant="ghost" onClick={() => reset()}>
                                Reset
                            </Button>
                            <Button type="submit" variant="red" disabled={processing}>
                                Save
                            </Button>
                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-muted-foreground">Saved.</p>
                            </Transition>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
