📁 Struktura projektu React

Projekt zorganizowany jest zgodnie z zasadami modularności i skalowalności. Poniżej znajduje się opis struktury katalogów znajdujących się w folderze src/.

📁 app/

Zawiera routing i strony aplikacji (Next.js lub React Router). Struktura podzielona wg ról użytkowników.

admin/ – widoki i strony administratora

moderator/ – widoki moderatora

layout.tsx – wspólny layout (np. nawigacja, footer itp.)

📁 components/ui/

Zawiera reużywalne, prezentacyjne komponenty UI (np. Button, Modal, Input). Komponenty są stateless i pozbawione logiki biznesowej.

📁 constants/

Zawiera stałe, np.:

roles.ts – definicje ról

endpoints.ts – adresy API

limits.ts – limity systemowe

📁 core/

Zawiera kluczową logikę wspólną dla całej aplikacji.

events.ts – globalne eventy / typy eventów

history.ts – customowy obiekt historii (np. z react-router)

pubsub.ts – system publish-subscribe do komunikacji komponentów

types/ – globalne typy i interfejsy

workers/ – webworkery i background tasks

api/ – interfejsy komunikacji z backendem (np. axios, fetch wrappers)

store.ts – setup np. Redux/Zustand/MobX

tracker.ts – narzędzia do śledzenia zdarzeń / analytics

📁 context/

Zawiera React Contexty – logika udostępniana globalnie (np. AuthContext, ThemeContext).

📁 hooks/

Zawiera custom hooki (np. useAuth, useDebounce, useFetch).

📁 features

Podział aplikacji na moduły / funkcjonalności:

Każdy folder zawiera:

components/

services/ (logika API)

hooks/

state/ (np. slice, reducer lub Zustand store)

Np.:

modules/
└── users/
├── components/
├── services/
├── hooks/
└── state/

📁 lib/

Pomocnicze funkcje, biblioteczki, adaptery – np. dateFormatter, classNames, validators, localStorageUtils.

📁 style/

Zawiera style globalne (np. Tailwind config, zmienne SCSS, czcionki).







# Projetc Architecture
```
├── public/
└── src/
    ├── app/
    │   ├── admin/
    │   │   └── dashboard/
    │   ├── login/
    │   │   └── page.tsx
    │   ├── moderator/
    │   │   └── dashboard/
    │   ├── global.css
    │   ├── layout.tsx
    │   └── page.tsx
    ├── components/
    │   └── ui/
    ├── config/             // e.g.API base URL, feature toggles, env vars parser, i18n, global settings
    ├── core/
    │   ├── api/
    │   ├── types/
    │   ├── workers/
    │   ├── events.ts       // e.g. auto signout on inactivity
    │   ├── history.ts
    │   ├── pubsub.ts
    │   ├── store.ts        // e.g. Redux store setup
    │   └── tracker.ts      // e.g. error tracker
    ├── features/
    │   ├── auth/
    │   │   ├── api/
    │   │   ├── components/    
    │   │   ├── hooks/    
    │   │   └── types/    
    │   ├── dashboard/
    │   ├── profile/
    │   └── users/ 
    ├── lib/
    └── shared/
        ├── constants/
        ├── hooks/
        └── style/
``` 












