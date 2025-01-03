import HeaderForm from '@/Components/HeaderForm';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import AppLayout from '@/Layouts/AppLayout';
import { flashMessage } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';
import { toast } from 'sonner';

export default function Create({ page_settings, visibilities }) {
    const fileInputCover = useRef(null);
    const fileInputLogo = useRef(null);
    const { data, setData, processing, reset, post, errors } = useForm({
        name: '',
        cover: '',
        logo: '',
        visibility: 'Private',
        _method: page_settings.method,
    });

    const onHandleSubmit = (e) => {
        e.preventDefault();
        post(page_settings.action, {
            onSuccess: (success) => {
                const flash = flashMessage(success);
                if (flash) toast[flash.type](flash.message);
            },
            preserveScroll: true,
            preserveState: true,
        });
    };

    const onHandleReset = () => {
        reset();
        if (fileInputCover.current) {
            fileInputCover.current.reset();
        }
        if (fileInputLogo.current) {
            fileInputLogo.current.reset();
        }
        setData('visibility', data.visibility);
    };

    return (
        <>
            <div className="space-y-10 divide-y divide-dashed divide-gray-900/10">
                <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-3">
                    <HeaderForm title={page_settings.title} subtitle={page_settings.subtitle} />
                    <Card className="md:col-span-2">
                        <CardContent>
                            <form onSubmit={onHandleSubmit}>
                                <div className="py-6">
                                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="col-span-full">
                                            <InputLabel htmlFor="name" value="Name" />
                                            <TextInput
                                                id="name"
                                                name="name"
                                                type="text"
                                                value={data.name}
                                                onChange={(e) => setData(e.target.name, e.target.value)}
                                                onErrors={errors.name && <InputError message={errors.name} />}
                                            />
                                        </div>
                                        <div className="col-span-full">
                                            <InputLabel htmlFor="cover" value="Cover" />
                                            <TextInput
                                                id="cover"
                                                name="cover"
                                                type="file"
                                                onChange={(e) => setData(e.target.name, e.target.files[0])}
                                                onErrors={errors.cover && <InputError message={errors.cover} />}
                                                ref={fileInputCover}
                                            />
                                        </div>
                                        <div className="col-span-full">
                                            <InputLabel htmlFor="logo" value="Logo" />
                                            <TextInput
                                                id="logo"
                                                name="logo"
                                                type="file"
                                                onChange={(e) => setData(e.target.name, e.target.files[0])}
                                                onErrors={errors.cover && <InputError message={errors.logo} />}
                                                ref={fileInputLogo}
                                            />
                                        </div>
                                        <div className="col-span-full">
                                            <InputLabel htmlFor="visibility" value="Visibility" />
                                            <Select
                                                defaultValue="Select a visibility"
                                                onValueChange={(value) => setData('visibility', value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue>
                                                        {visibilities.find(
                                                            (visibility) => visibility.value === data.visibility,
                                                        )?.label ?? 'Select a Visibility'}
                                                    </SelectValue>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {visibilities.map((visibility, index) => (
                                                        <SelectItem key={index} value={visibility.value}>
                                                            {visibility.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {errors.visibility && <InputError message={errors.visibility} />}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-end gap-x-2 py-6">
                                    <Button type="button" variant="ghost" onClick={() => onHandleReset()}>
                                        Reset
                                    </Button>
                                    <Button type="submit" variant="red" disabled={processing}>
                                        Save
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

Create.layout = (page) => <AppLayout title="Workspace Create" children={page} />;
