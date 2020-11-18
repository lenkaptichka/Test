// Ответ, полученный от сервера (будем считать, что уже преобразованный из формата json)
const responseFromServer = {
	"displayedName": {
			"displayedName": {
					"value": [
							"Профиль маячковый ПВХ 10 мм L3м"
					],
					"description": "Полное наименование товара для клиента"
					}
			},
	"stock": {
			"stocks": {
							"34": {
							"2": "35",
							"3": "42",
							"4": "58",
							"5": "57",
							"6": "112",
							"20": "51",
							"22": "78",
							"26": "34",
							"32": "22",
							"35": "358",
							"40": "28",
							"43": "68",
							"45": "58",
							"49": "31",
							"51": "29",
							"56": "42",
							"62": "26",
							"64": "0",
							"65": "57",
							"86": "15",
							"114": "41",
							"117": "46",
							"143": "46",
							"162": "4",
							"171": "0",
							"176": "12"
					}
			}
	}
};
// Будем считать, что нам известен регион, в котором необходимо производить поиск
const numberOfRegion = '34';


// Класс для работы с перечнем товаров
class Products {
	constructor(response) {
		this.response = response;
	};

	// Получение название товара
	getProductName() {
		// Сразу же возваращаем название товара
		return this.response.displayedName.displayedName.value[0];
	};

	// Получение массива номеров магазинов, в которых есть товары в наличии
	getNumbersOfStocks() {
		// Будем искать товары только в нужном регионе
		const regionShops = this.response.stock.stocks[numberOfRegion];

		// Перебираем все значения свойств объекта
		const arrOfStores = [];
		for (let numberOfShop in regionShops) {
			if (Number(regionShops[numberOfShop]) > 0) {
				arrOfStores.push(numberOfShop);
			}
		};
		return arrOfStores
	};

	// Нахождение максимального количества товара в регионе, везваращение этого количества и номера магазина
	getMaxQuantityOfProducts() {
		// Будем искать товары только в нужном регионе
		const regionShops = this.response.stock.stocks[numberOfRegion];

		//  в котором будут храниться номер магазина и максимальное количество товара
		let stockNumber = 0;
		let maxQuantity = 0;

		// Перебираем все значения свойств объекта
		for (let numberOfShop in regionShops) {
			if (Number(regionShops[numberOfShop]) > maxQuantity) {
				// Если количества товара больше, чем в предыдущем магазине, перезаписываем значения соответствующих перемнных
				stockNumber = numberOfShop;
				maxQuantity = regionShops[numberOfShop];
			}
		}
		return {stockNumber, maxQuantity};		
	}
}

const product = new Products(responseFromServer);
product.getProductName();
product.getNumbersOfStocks();
product.getMaxQuantityOfProducts();