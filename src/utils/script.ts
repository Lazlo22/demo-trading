interface LoadScriptParams {
    src: string;
    async?: boolean;
    defer?: boolean;
    onload?: VoidFunction;
    innerHTML?: string;
}

export const loadScript = ({ src, async = false, defer = false, onload, innerHTML = '' }: LoadScriptParams): HTMLScriptElement => {
    const script = document.createElement('script');

    script.src = src;
    script.type = 'text/javascript';
    script.async = async;
    script.defer = defer;

    if (onload) {
        script.onload = onload;
    }

    script.innerHTML = innerHTML;

    return script;
};