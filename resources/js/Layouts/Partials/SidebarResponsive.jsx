import { Link } from '@inertiajs/react';
import { PiHouse, PiLockKeyOpen, PiPlus, PiSquaresFour, PiUser } from 'react-icons/pi';

export default function SidebarResponsive({ auth }) {
    return (
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2 dark:bg-gray-900">
            <div className="flex h-16 shrink-0 items-center space-x-1.5">
                <Link href="/" className="-m-1.5 p-1.5 text-2xl font-black leading-relaxed tracking-tighter">
                    Plannify<span className="text-red-500">.</span>
                </Link>
            </div>
            <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                        <ul role="list" className="-mx-2 space-y-1">
                            {/* menu */}
                            <li>
                                <Link
                                    href="#"
                                    className="group flex gap-x-3 rounded-md p-3 text-sm font-semibold leading-relaxed text-foreground hover:bg-gray-100"
                                >
                                    <PiHouse className="h-6 w-6 shrink-0 text-foreground" />
                                    Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="group flex gap-x-3 rounded-md p-3 text-sm font-semibold leading-relaxed text-foreground hover:bg-gray-100"
                                >
                                    <PiUser className="h-6 w-6 shrink-0 text-foreground" />
                                    People
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="group flex gap-x-3 rounded-md p-3 text-sm font-semibold leading-relaxed text-foreground hover:bg-gray-100"
                                >
                                    <PiSquaresFour className="h-6 w-6 shrink-0 text-foreground" />
                                    My Tasks
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="group flex gap-x-3 rounded-md p-3 text-sm font-semibold leading-relaxed text-foreground hover:bg-gray-100"
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
                                Workspace
                            </div>
                            <Link>
                                <PiPlus className="h-4 w-4 text-foreground hover:text-red-500" />
                            </Link>
                        </div>
                        <ul role="list" className="-mx-2 mt-2 space-y-1">
                            <li>
                                <Link
                                    href="#"
                                    className="group flex w-full gap-x-3 rounded-md p-3 text-sm font-semibold leading-relaxed text-foreground hover:bg-gray-100"
                                >
                                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-foreground bg-white text-[0.625rem] font-medium text-foreground">
                                        B
                                    </span>
                                    <span className="turncate">Backend Developer</span>
                                </Link>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
