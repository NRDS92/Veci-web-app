"use client";

export default function Topbar() {

    return (

        <header className="h-16 border-b bg-white flex items-center justify-between px-8">

            <h1 className="text-xl font-semibold">
                Admin Panel
            </h1>

            <div className="flex items-center gap-4">

                <div className="w-10 h-10 rounded-full bg-yellow-400" />

                <span>Andres</span>

            </div>

        </header>

    );

}