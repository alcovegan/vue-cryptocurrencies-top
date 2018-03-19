<i18n>
{
  "en": {
      "rank": "Rank",
      "name": "Name",
      "symbol": "Symbol",
      "price": "Price",
      "oneHourPercent": "% 1h",
      "twentyFourPercent": "% 24h",
      "weeklyPercent": "% 7d",
      "marketCap": "Market Cap",
      "currencies": {
      	"USD": "US Dollar",
      	"RUB": "Russian ruble"
      }
  },
  "ru": {
      "rank": "Позиция",
      "name": "Название",
      "symbol": "Символ",
      "price": "Цена",
      "oneHourPercent": "% за сутки",
      "twentyFourPercent": "% за 24 часа",
      "weeklyPercent": "% за неделю",
      "marketCap": "Капитализация",
      "currencies": {
      	"USD": "Доллар США",
      	"RUB": "Российский рубль"
      }
  }
}
</i18n>

<template>
	<div id="app">
		<div class="container">
			<div class="row d-block">
				<h1>Рейтинг криптовалют</h1>

				<div class="selectors">
					<select name="currency__amount" id="" @change="fetchAPI(amount, selectedCurrency)" v-model="amount">
						<option value="10">10</option>
						<option value="20">20</option>
						<option value="30">30</option>
						<option value="50">50</option>
						<option value="100">100</option>
					</select>
					<select name="currency__choise" id="" @change="fetchAPI(amount, selectedCurrency)" v-model="selectedCurrency">
						<option value="USD">USD ({{ $t('currencies.USD') }})</option>
						<option value="AUD">AUD</option>
						<option value="BRL">BRL</option>
						<option value="CAD">CAD</option>
						<option value="CHF">CHF</option>
						<option value="CNY">CNY</option>
						<option value="EUR">EUR</option>
						<option value="GBP">GBP</option>
						<option value="HKD">HKD</option>
						<option value="IDR">IDR</option>
						<option value="INR">INR</option>
						<option value="JPY">JPY</option>
						<option value="KRW">KRW</option>
						<option value="MXN">MXN</option>
						<option value="RUB">RUB ({{ $t('currencies.RUB') }})</option>
					</select>

					<select v-model="locale">
						<option>ru</option>
						<option>en</option>
					</select>
				</div>

				<table class="table">
					<thead>
						<tr>
						<th>{{ $t('rank') }}</th>
						<th>{{ $t('name') }}</th>
						<th>{{ $t('symbol') }}</th>
						<th>{{ $t('price') }} ({{ selectedCurrency }})</th>
						<th>{{ $t('oneHourPercent') }}</th>
						<th>{{ $t('twentyFourPercent') }}</th>
						<th>{{ $t('weeklyPercent') }}</th>
						<th>{{ $t('marketCap') }} ({{ selectedCurrency }})</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(currency, index) in rating">
						<th scope="row">{{ index + 1 }}</th>

							<td><img :src="getCurrencyImage(currency.symbol)" class="currency__image">
								{{ currency.name }}
							</td>

							<td>
								{{ currency.symbol }}
							</td>

							<td v-if="!isFetching" v-cloak>
								{{ showCurrencySymbol(showInSelectedCurrency(currency).convertedPrice) }}
							</td>

							<td v-if="!isFetching" v-cloak :class="percentChanged(currency.percent_change_1h)">
								{{ currency.percent_change_1h }}
							</td>

							<td v-if="!isFetching" v-cloak :class="percentChanged(currency.percent_change_24h)">
								{{ currency.percent_change_24h }}
							</td>

							<td v-if="!isFetching" v-cloak :class="percentChanged(currency.percent_change_7d)">
								{{ currency.percent_change_7d }}
							</td>

							<td v-if="!isFetching" v-cloak>
								{{ showCurrencySymbol(showInSelectedCurrency(currency).convertedPriceMC) }}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

	</div>
</template>

<script>
import axios from 'axios'
const UPDATE_INTERVAL = 60 * 1000

export default {
	name: 'app',
	data () {
		return {
			amount: 10,
			selectedCurrency: 'USD',
			rating: [],
			assets: {},
			priceDroppedStyles: 'currency__price-down',
			priceUpStyles: 'currency__price-up',
			isFetching: false,
			locale: this.$i18n.locale || 'en'
		}
	},
	watch: {
		locale (val) {
			this.$i18n.locale = val
		}
	},
	methods: {
		fetchAPI: function(limit = 10, convert = '') {
			console.log('start fetching');

			const requestURL = `https://api.coinmarketcap.com/v1/ticker/?limit=${limit}&convert=${convert}`;

			this.isFetching = true;

			axios.get(requestURL)
				.then(response => {
					this.rating = response.data;
					this.isFetching = false;
				})
		},
		fetchAssets: function() {
			axios.get('https://min-api.cryptocompare.com/data/all/coinlist')
				.then(response => {
					this.assets = response.data.Data;

					console.log('assets fetched', response.data);
				})
		},
		percentChanged: function(change) {
			return Number(change) > 0 ? this.priceUpStyles : this.priceDroppedStyles
		},
		getCurrencyImage: function(symbol) {
			if(symbol === 'MIOTA') {
				symbol = 'IOT'
			} else if (symbol === 'BCC') {
				symbol = 'BCCOIN'
			}

			const imagePath = this.assets[symbol];
			const image = imagePath !== undefined ? imagePath.ImageUrl.replace('/', '') : 'empty.jpg'

			return `https://www.cryptocompare.com/${image}`
		},
		showInSelectedCurrency: function(currencyObject) {
			const selectedCurrency = this.selectedCurrency.toLowerCase();
			const convertedPrice = currencyObject[`price_${selectedCurrency}`];
			const convertedPrice24h = currencyObject[`24h_volume_${selectedCurrency}`];
			const convertedPriceMC = currencyObject[`market_cap_${selectedCurrency}`];

			return {
				convertedPrice,
				convertedPrice24h,
				convertedPriceMC
			}
		},
		showCurrencySymbol: function(price) {
			const currencySymbols = {
				"USD": {
					symbol: "$"
				},
				"AUD": {
					symbol: "$"
				},
				"BRL": {
					symbol: "R$"
				},
				"CAD": {
					symbol: "$"
				},
				"CHF": {
					symbol: "Fr"
				},
				"CNY": {
					symbol: "¥"
				},
				"EUR": {
					symbol: "€"
				},
				"GBP": {
					symbol: "£"
				},
				"HKD": {
					symbol: "$"
				},
				"IDR": {
					symbol: "Rp"
				},
				"INR": {
					symbol: "₹"
				},
				"JPY": {
					symbol: "¥"
				},
				"KRW": {
					symbol: "₩"
				},
				"MXN": {
					symbol: "$"
				},
				"RUB": {
					symbol: "₽"
				}
			}


			return `${currencySymbols[this.selectedCurrency].symbol} ${price}`
		}
	},
	computed: {

	},
	created: function() {
		// var self = this;

		this.fetchAssets();
		this.fetchAPI(10);

		this.interval = setInterval(() => {
			this.fetchAPI(this.amount, this.selectedCurrency);
		}, UPDATE_INTERVAL);
	},
	beforeDestroy: function(){
		clearInterval(this.interval);
	}
}
</script>

<style>
	[v-cloak] {
	  visibility: hidden;
	}

	.currency__price-up:before {
		content: '+';
	}

	.currency__price-up {
		color: green;
	}

	.currency__price-down {
		color: red;
	}

	.currency__image {
		max-width: 25px;
		margin-right: 10px;
	}

	.selectors {
		margin: 1rem 0;
	}
</style>
