## Project Structure

```
app/
  layout.tsx
  (report)/
    page.tsx                     # picker inicial
    [clientId]/
      layout.tsx                 # monta topbar + sidebar + page-nav
      overview/page.tsx
      performance/page.tsx
      exposure/page.tsx
      allocation/page.tsx
      institutions/page.tsx
      positions/page.tsx
      liquidity/page.tsx
      movements/page.tsx
      _components/
        topbar.tsx
        section-rail.tsx
        page-index.tsx
        content-shell.tsx
  print/
    [clientId]/page.tsx
components/ui/*                  # (shadcn)
lib/sections.ts                  # util com mapa das seções/páginas
```