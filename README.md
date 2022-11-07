# fresh_g_a

fresh_g_a is a [Fresh Framework](https://fresh.deno.dev/) middleware. Uses [g_a](https://deno.land/x/g_a) (by denoteam) to collect server side Google Analytics events.

Forked from [fresh_ga](https://deno.land/x/fresh_ga), a client side data collection plugin which adding the [gtag](https://developers.google.com/tag-platform/gtagjs) to the html output.

## Usage

### Add to your import map

```json
// in your import_map.json
{
  "imports": {
    "$fresh_g_a/": "https://deno.land/x/fresh_g_a@0.1.2/"
  }
}
```

### Setup your routes/_middleware.ts

```ts
import { gaMiddleware } from '$fresh_g_a/mod.ts'

export const handler = [
    // other middlewares...
    gaMiddleware
];

```


### Set the GA_TRACKING_ID environment variable
Use the value provided by Google Analytics (G-XXXXXXXXXX). For more info refer to [g_a's documentation](https://deno.land/x/g_a)
