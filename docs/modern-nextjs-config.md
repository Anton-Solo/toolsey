# Modern Next.js 13+ App Router Configuration

## Сучасний підхід до ISR та статичної генерації

### Що змінилося в Next.js 13+

В нових версіях Next.js з App Router підхід до конфігурації змінився:

#### ❌ Старий підхід (Pages Router):
```js
export async function getStaticPaths() {
  // ...
}

export async function getStaticProps() {
  // ...
}
```

#### ✅ Новий підхід (App Router):
```js
// На рівні сторінки
export const revalidate = 300; // ISR revalidation
export const dynamicParams = true; // Allow dynamic routes

// Опціонально для pre-generation
export async function generateStaticParams() {
  // Генерує тільки популярні маршрути
}
```

### Наша конфігурація

#### Blog List Page (`/app/blog/page.tsx`):
```js
export const revalidate = 300; // Оновлення кожні 5 хвилин
```

#### Blog Post Page (`/app/blog/[id]/page.tsx`):
```js
export const revalidate = 300; // ISR: revalidate every 5 minutes
export const dynamicParams = true; // Generate pages on-demand for new posts
```

### Переваги сучасного підходу:

1. **On-Demand Generation**: Сторінки генеруються по запиту
2. **Менше build time**: Не потрібно генерувати всі сторінки одразу
3. **Автоматичне ISR**: Встроєна підтримка Incremental Static Regeneration
4. **Гнучкість**: `dynamicParams = true` дозволяє нові маршрути

### Конфігурація Fetch:

#### ❌ Старий підхід:
```js
fetch(url, {
  next: {
    revalidate: 300
  }
})
```

#### ✅ Новий підхід:
```js
// Revalidation контролюється на рівні сторінки
fetch(url, {
  // Без next.revalidate
})
```

### Результат:

- **Швидший build**: Генеруються тільки найпопулярніші сторінки
- **Автоматичне ISR**: Нові пости доступні через 5 хвилин
- **On-demand**: Нові маршрути генеруються при першому запиті
- **Кращий DX**: Простіша конфігурація
