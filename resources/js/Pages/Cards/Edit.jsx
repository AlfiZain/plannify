import HeaderForm from '@/Components/HeaderForm';
import AppLayout from '@/Layouts/AppLayout';
import UpdateCard from './UpdateCard';

export default function Edit({ card, page_settings, statuses, priorities, workspace }) {
    return (
        <>
            <div className="space-y-10 divide-y divide-dashed divide-gray-900/10">
                <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-3">
                    <HeaderForm title={page_settings.title} subtitle={page_settings.subtitle} />
                    <UpdateCard card={card} page_settings={page_settings} statuses={statuses} priorities={priorities} />
                </div>
            </div>
        </>
    );
}

Edit.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;
