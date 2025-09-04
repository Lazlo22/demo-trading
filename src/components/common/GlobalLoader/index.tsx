import type { FC } from "react";

interface GlobalLoaderProps {
    title: string;
}

export const GlobalLoader: FC<GlobalLoaderProps> = ({ title }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background-primary">
            <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-border-primary mx-auto mb-4"></div>
            <p className="text-text-secondary">{title}</p>
            </div>
        </div>
    );
};

GlobalLoader.displayName = "GlobalLoader";