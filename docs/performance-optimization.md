# Performance Optimization - Lazy Loading

## ConsolidatingAnim Lazy Loading Implementation

### Проблема
`ConsolidatingAnim` компонент містить великий SVG з багатьма елементами (560+ рядків коду), що впливає на:
- Початкову швидкість завантаження сторінки
- Performance score
- User experience

### Рішення
Реалізовано комбінований підхід lazy loading:

#### 1. **Dynamic Import (Next.js)**
```typescript
const ConsolidatingAnim = dynamic(() => 
  import("./ConsolidatingAnim").then(mod => ({ default: mod.ConsolidatingAnim })), 
  { ssr: false }
);
```

#### 2. **Intersection Observer API**
```typescript
const observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting && !isVisible) {
      setIsVisible(true);
      observer.disconnect();
    }
  },
  {
    rootMargin: '200px', // Завантаження за 200px до появи
    threshold: 0.1
  }
);
```

#### 3. **Skeleton Loading**
Реалістичний placeholder з:
- Кружечками що імітують структуру
- Skeleton іконками
- Loading spinner

### Переваги

#### **Performance:**
- ✅ Зменшення initial bundle size
- ✅ Швидший Time to Interactive (TTI)
- ✅ Кращий Lighthouse score
- ✅ Менше memory usage на початку

#### **User Experience:**
- ✅ Швидше завантаження сторінки
- ✅ Smooth skeleton transition
- ✅ Завантаження тільки при необхідності

#### **Developer Experience:**
- ✅ Простота використання (drop-in replacement)
- ✅ Опціональне відключення для тестування
- ✅ TypeScript підтримка

### Використання

```tsx
// Замість
import { ConsolidatingAnim } from "@/components/home/ConsolidatingAnim";

// Використовуємо
import { LazyConsolidatingAnim } from "@/components/home/LazyConsolidatingAnim";

// В компоненті
<LazyConsolidatingAnim className="your-classes" />

// Для тестування (відключити lazy loading)
<LazyConsolidatingAnim 
  className="your-classes" 
  disableLazyLoading={true} 
/>
```

### Метрики
- **До:** Компонент завантажується одразу (~560 рядків SVG)
- **Після:** Компонент завантажується тільки при скролі до секції
- **Skeleton:** Займає ту ж площу, плавний перехід
- **Timing:** Завантаження за 200px до появи для seamless UX

### Технічні деталі
- Використовує `IntersectionObserver` для detection
- `rootMargin: '200px'` для preloading
- `ssr: false` для client-side rendering
- Automatic cleanup observers
- TypeScript interfaces для type safety
