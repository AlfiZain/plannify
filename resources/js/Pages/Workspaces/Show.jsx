import GetPriorityBadge from '@/Components/GetPriorityBadge';
import { Card, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';
import { PiDotsThreeOutlineFill, PiPlus } from 'react-icons/pi';

export default function Show({ ...props }) {
    const workspace = props.workspace;
    const statuses = props.statuses;
    const cards = props.cards;

    return (
        <>
            <div>
                <img className="h-32 w-full object-cover lg:h-48" src={workspace.cover} alt={workspace.name} />
            </div>
            <div className="px-2 sm:px-4">
                <div className="-mt-12 sm:flex sm:items-center sm:space-x-5">
                    <div className="flex">
                        <img
                            className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                            src={workspace.logo}
                            alt={workspace.name}
                        />
                    </div>
                    <div className="items-center sm:flex sm:min-w-0 sm:flex-1 sm:justify-end sm:space-x-6 sm:pb-1">
                        <div className="mt-6 min-w-0 flex-1">
                            <CardTitle className="text-4xl leading-relaxed tracking-tighter">
                                {workspace.name}
                            </CardTitle>
                        </div>
                        <div className="mt-8 flex items-center gap-x-8">
                            <Link
                                href={route('cards.create', [workspace])}
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium text-foreground ring-offset-background transition-colors hover:font-bold hover:text-red-500 hover:no-underline hover:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                            >
                                Create Card
                            </Link>
                            <Link
                                href={route('workspaces.edit', [workspace])}
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium text-foreground ring-offset-background transition-colors hover:font-bold hover:text-red-500 hover:no-underline hover:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                            >
                                Settings
                            </Link>
                        </div>
                    </div>
                </div>
                {/* Card */}
                <div className="mt-8 flex w-full flex-col justify-start gap-x-5 gap-y-8 sm:flex-row">
                    {statuses.map((status, index) => (
                        <div className="w-full space-y-4 sm:w-1/4" key={index}>
                            <div className="flex items-center justify-between">
                                <span className="text-base font-semibold leading-relaxed tracking-tighter">
                                    {status.value}
                                </span>
                                <div className="flex items-center gap-x-3">
                                    <Link
                                        href={route('cards.create', {
                                            workspace: workspace,
                                            _query: {
                                                status: status.value,
                                            },
                                        })}
                                    >
                                        <PiPlus className="h-4 w-4 text-foreground transition-colors duration-200 hover:text-red-500"></PiPlus>
                                    </Link>
                                </div>
                            </div>
                            {/* Column Card Container */}
                            <div className="flex flex-grow flex-col gap-4 overflow-y-auto overflow-x-hidden p-2">
                                {cards
                                    .filter((card) => card.status === status.value)
                                    .map((card, index) => (
                                        <Card
                                            key={index}
                                            className="relative rounded-xl hover:ring-2 hover:ring-inset hover:ring-red-500"
                                        >
                                            <CardHeader>
                                                <div className="flex items-center justify-between gap-x-4">
                                                    <CardTitle className="line-clamp-2 text-base leading-relaxed tracking-tighter">
                                                        <Link
                                                            href={route('cards.show', [workspace, card])}
                                                            className="hover:text-red-500"
                                                        >
                                                            {card.title}
                                                        </Link>
                                                    </CardTitle>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger>
                                                            <PiDotsThreeOutlineFill className="size-4" />
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end" className="w-48">
                                                            <DropdownMenuItem asChild className="hover:cursor-pointer">
                                                                <Link href={route('cards.edit', [workspace, card])}>
                                                                    Edit
                                                                </Link>
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                                <div>
                                                    <GetPriorityBadge priority={card.priority} />
                                                </div>
                                                <CardDescription className="line-clamp-4 leading-relaxed tracking-tighter">
                                                    {card.description}
                                                </CardDescription>
                                            </CardHeader>
                                        </Card>
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

Show.layout = (page) => <AppLayout title={page.props.workspace.name} children={page} />;
