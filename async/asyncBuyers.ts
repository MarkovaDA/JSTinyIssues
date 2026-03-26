type Buyer = {
  price: number;
  accepts: () => Promise<boolean>;
};

async function bestBuyer(buyers: Buyer[]): Promise<number> {
  // массив с индексами сортируем по убыванию цен
  const sortedBuyers = buyers
    .map((buyer, index) => ({ ...buyer, originalIndex: index }))
    .sort((a, b) => b.price - a.price);

  // ответы покупателей
  const responses: { accepted: boolean | null }[] = sortedBuyers.map(() => ({ accepted: null }));

  // Функция для обработки ответа конкретного покупателя
  const handleResponse = (index: number, accepted: boolean) => {
    responses[index].accepted = accepted;

    // Ищем лучшего подходящего покупателя
    for (let i = 0; i < sortedBuyers.length; i++) {
      const response = responses[i];
      const buyer = sortedBuyers[i];

      // Если покупатель согласился
      if (response.accepted === true) {
        // Проверяем, что все покупатели с более высокой ценой уже ответили (и отказались)
        const allHigherRejected = sortedBuyers
          .slice(0, i)
          .every((_, j) => responses[j].accepted === false);

        if (allHigherRejected) {
          return buyer.originalIndex;
        }
      }

      // Если текущий покупатель отказался, продолжаем проверку
      if (response.accepted === false) {
        continue;
      }
    }

    return -1; // Пока не можем выбрать победителя
  };

  // запускаем все запросы параллельно
  const responsePromises = sortedBuyers.map((buyer, index) =>
    buyer.accepts().then(accepted => handleResponse(index, accepted))
  );

  // ждём первого успешного результата (когда можно выбрать победителя)
  const results = await Promise.all(responsePromises);
  
  // Возвращаем первый найденный индекс покупателя (или -1, если никто не подошёл)
  return results.find(result => result !== -1) ?? -1;
}