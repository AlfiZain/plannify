import { CardTitle } from '@/Components/ui/card';
import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';

export default function Show({ ...props }) {
    const workspace = props.workspace;

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
                                href="#"
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium text-foreground ring-offset-background transition-colors hover:font-bold hover:text-red-500 hover:no-underline hover:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                            >
                                Create Card
                            </Link>
                            <Link
                                href="#"
                                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium text-foreground ring-offset-background transition-colors hover:font-bold hover:text-red-500 hover:no-underline hover:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                            >
                                Settings
                            </Link>
                        </div>
                    </div>
                </div>
                {/* Card */}
            </div>
        </>
    );
}

Show.layout = (page) => <AppLayout title={page.props.workspace.name} children={page} />;
