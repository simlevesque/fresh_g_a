
import { MiddlewareHandlerContext } from "$fresh/server.ts";
import { createReporter } from "$g_a/mod.ts";

const ga = createReporter();

export async function gaMiddleware(req: Request, ctx: MiddlewareHandlerContext): Promise<Response> {
    const start = performance.now();
    const res = await ctx.next();

    if (!res.headers.get('content-type')?.includes("text/html")) {
        return res;
    }

    notifyGA();

    return res

    async function notifyGA () {
        const body = await (await res.clone()).text();
        ga(req, ctx, res, start, extractErrorFromFreshBody(body));
    }
}

export function extractErrorFromFreshBody (body: string): Error | undefined {
    if (!/An error occurr?ed during route handling or page rendering./.test(body)) {
        return;
    }
    const extractor = new RegExp('<pre [^<]+>([^<]+)<\/pre>');
    const errorString = (extractor.exec(body)|| [])[1];

    if (!errorString) {
        return;
    }

    const [firstLine] = errorString.split("\n");

    const message = firstLine.split(":")[1].split("\n")[0].trim()
    const error = new Error(message)

    error.name = firstLine.split(":")[0].trim()
    error.stack = errorString

    return error
}
