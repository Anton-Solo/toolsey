import FunnelAnim from '@/components/features/FunnelAnim';

// Приклад 1: Базове використання
export function BasicFunnelExample() {
  return (
    <div className="h-[600px] w-full">
      <FunnelAnim />
    </div>
  );
}

// Приклад 2: З кастомними налаштуваннями
export function CustomFunnelExample() {
  return (
    <div className="container mx-auto py-10">
      <h2 className="mb-6 text-center text-3xl font-bold">
        Наша воронка продажів
      </h2>
      <div className="h-[500px] w-full md:w-3/4 lg:w-1/2 mx-auto">
        <FunnelAnim 
          loop={true} 
          autoplay={true}
          className="rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
}

// Приклад 3: Інтеграція з існуючою секцією (як у LeadAgg)
export function FunnelSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">
              Візуалізація воронки
            </h2>
            <p className="mb-6 text-lg text-gray-600">
              Відстежуйте кожен етап воронки продажів від першого контакту до закриття угоди.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="mr-3 text-2xl">📊</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Новий лід</h3>
                  <p className="text-gray-600">Автоматичне додавання нових потенційних клієнтів</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-2xl">💬</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Контакт</h3>
                  <p className="text-gray-600">Перший контакт з клієнтом</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-2xl">📅</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Зустріч</h3>
                  <p className="text-gray-600">Призначення та проведення зустрічей</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-2xl">✅</span>
                <div>
                  <h3 className="font-semibold text-gray-900">Закрито</h3>
                  <p className="text-gray-600">Успішне завершення угоди</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="order-1 lg:order-2">
            <div className="h-[600px] w-full">
              <FunnelAnim />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

