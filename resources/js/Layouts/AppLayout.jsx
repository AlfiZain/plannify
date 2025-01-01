import { Avatar, AvatarFallback } from '@/Components/ui/avatar';
import { Dialog, Transition } from '@headlessui/react';
import { Head, Link } from '@inertiajs/react';
import { Fragment, useState } from 'react';
import { PiHouse, PiLockKeyOpen, PiPlus, PiSidebar, PiSquaresFour, PiUser, PiX } from 'react-icons/pi';

export default function AppLayout({ children, title }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <Head title={title} />
            <div>
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-900/80" />
                        </Transition.Child>

                        <div className="fixed inset-0 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                            <button
                                                type="button"
                                                className="-m-2.5 p-2.5"
                                                onClick={() => setSidebarOpen(false)}
                                            >
                                                <span className="sr-only">Close sidebar</span>
                                                <PiX className="h-6 w-6 text-white" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    {/* Sidebar Responsive */}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                    <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 dark:border-gray-800 dark:bg-gray-900">
                        <div className="flex h-16 shrink-0 items-center space-x-1.5">
                            <Link
                                href="/"
                                className="-m-1.5 p-1.5 text-2xl font-black leading-relaxed tracking-tighter"
                            >
                                Plannify<span className="text-red-500">.</span>
                            </Link>
                        </div>
                        {/* Sidebar */}
                        <nav className="flex flex-1 flex-col">
                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                <li>
                                    <ul role="list" className="-mx-2 space-y-2">
                                        {/* menu */}
                                        <li>
                                            <Link
                                                href="#"
                                                className="group flex gap-x-3 rounded-md p-3 text-sm font-semibold leading-relaxed tracking-tighter text-foreground hover:bg-gray-100"
                                            >
                                                <PiHouse className="h-6 w-6 shrink-0 text-foreground" />
                                                Dashboard
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="#"
                                                className="group flex gap-x-3 rounded-md p-3 text-sm font-semibold leading-relaxed tracking-tighter text-foreground hover:bg-gray-100"
                                            >
                                                <PiUser className="h-6 w-6 shrink-0 text-foreground" />
                                                People
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="#"
                                                className="group flex gap-x-3 rounded-md p-3 text-sm font-semibold leading-relaxed tracking-tighter text-foreground hover:bg-gray-100"
                                            >
                                                <PiSquaresFour className="h-6 w-6 shrink-0 text-foreground" />
                                                My Tasks
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="#"
                                                className="group flex gap-x-3 rounded-md p-3 text-sm font-semibold leading-relaxed tracking-tighter text-foreground hover:bg-gray-100"
                                            >
                                                <PiLockKeyOpen className="h-6 w-6 shrink-0 text-foreground" />
                                                Logout
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    {/* workspaces */}
                                    <div className="flex items-center justify-between">
                                        <div className="text-xs font-semibold uppercase leading-relaxed text-foreground">
                                            Workspaces
                                        </div>
                                        <Link>
                                            <PiPlus className="h-4 w-4 text-foreground hover:text-red-500"></PiPlus>
                                        </Link>
                                    </div>
                                    <ul role="list" className="mx-2 mt-2 space-y-2">
                                        <li>
                                            <Link
                                                href="#"
                                                className="group flex w-full gap-x-3 rounded-md p-3 text-sm font-semibold leading-relaxed tracking-tighter text-foreground hover:bg-gray-100"
                                            >
                                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-foreground bg-white text-[0.625rem] font-medium text-foreground">
                                                    B
                                                </span>
                                                <span className="turncate">Backend Developer</span>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="-mx-6 mt-auto">
                                    {/* profile */}
                                    <Link
                                        href="#"
                                        className="flex items-center gap-4 px-6 py-3 text-sm font-semibold leading-relaxed text-foreground hover:bg-gray-100"
                                    >
                                        <Avatar>
                                            <AvatarFallback>X</AvatarFallback>
                                        </Avatar>
                                        <span>Muhammad Alfi Zain</span>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm dark:bg-gray-900 sm:px-6 lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <PiSidebar className="h-6 w-6 text-foreground" aria-hidden="true" />
                    </button>
                    <div className="flex-1 text-sm font-semibold leading-relaxed tracking-tighter text-foreground">
                        {title}
                    </div>
                    <Link href="#">
                        <span className="sr-only">Your profile</span>
                        <Avatar>
                            <AvatarFallback>X</AvatarFallback>
                        </Avatar>
                    </Link>
                </div>

                <main className="py-10 lg:pl-72">
                    <div className="px-4 sm:px-6 lg:px-8">{children}</div>
                </main>
            </div>
        </>
    );
}
