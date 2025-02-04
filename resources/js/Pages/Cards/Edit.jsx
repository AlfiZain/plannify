import HeaderForm from '@/Components/HeaderForm';
import AppLayout from '@/Layouts/AppLayout';
import AttachmentCard from './AttachmentCard';
import MemberCard from './MemberCard';
import UpdateCard from './UpdateCard';

export default function Edit({ card, page_settings, statuses, priorities, workspace }) {
    return (
        <>
            <div className="space-y-10 divide-y divide-dashed divide-gray-900/10">
                <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-3">
                    <HeaderForm title={page_settings.title} subtitle={page_settings.subtitle} />
                    <UpdateCard card={card} page_settings={page_settings} statuses={statuses} priorities={priorities} />
                </div>
                <div className="grid grid-cols-1 gap-x-4 gap-y-8 pt-10 md:grid-cols-3">
                    <HeaderForm title="Members" subtitle="Please add member to the card" />
                    <MemberCard action={route('member_card.store', { card: card })} members={card.members} />
                </div>
                <div className="grid grid-cols-1 gap-x-4 gap-y-8 pt-10 md:grid-cols-3">
                    <HeaderForm title="Attachments" subtitle="Please add attachments to the card" />
                    <AttachmentCard action={route('attachments.store', [card])} />
                </div>
            </div>
        </>
    );
}

Edit.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;
