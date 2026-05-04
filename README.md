# GAAB Electronics Store

A Next.js electronics storefront built with the App Router. It includes product browsing, cart management, a checkout flow, and MPESA STK push API endpoints.

## Structure

- `app/`
  - `layout.js`
  - `page.js`
  - `products/`
  - `cart/`
  - `checkout/`
  - `api/`
- `components/`
- `context/`
- `hooks/`
- `lib/`
- `data/`
- `styles/`
- `public/images/`

## Notes

- Use `CartProvider` to wrap state for the cart.
- The MPESA route files are placeholders for `stkpush` and callback handling.
- Update env values in `.env.local` for live payment integration.
