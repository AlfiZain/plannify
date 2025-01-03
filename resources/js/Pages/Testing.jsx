import AppLayout from '@/Layouts/AppLayout';

export default function Testing() {
    return <div>This is testing. Lorem ipsum dolor sit amet.</div>;
}

Testing.layout = (page) => <AppLayout title="Testing" children={page} />;
