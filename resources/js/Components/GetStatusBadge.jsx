import { Badge } from '@/Components/ui/badge';
import { STATUS } from '@/lib/utils';

export default function GetPriorityBadge({ priority }) {
    const { TODO, ONPROGRESS, ONREVIEW, DONE, UNKNOWN } = STATUS;
    let badge, text;

    switch (priority) {
        case TODO:
            badge = 'bg-red-500 hover:bg-red-600';
            text = TODO;
            break;
        case ONPROGRESS:
            badge = 'bg-yellow-500 hover:bg-yellow-600';
            text = ONPROGRESS;
            break;
        case ONREVIEW:
            badge = 'bg-blue-500 hover:bg-blue-600';
            text = ONREVIEW;
            break;
        case DONE:
            badge = 'bg-green-500 hover:bg-green-600';
            text = DONE;
            break;
        default:
            badge = '';
            text = UNKNOWN;
    }

    return <Badge className={badge}>{text}</Badge>;
}
