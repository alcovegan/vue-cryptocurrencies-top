<i18n>
{
  "en": {
  	  "pageTitle": "Cryptocurrencies Rating (Top 100)",
  	  "settingsTitle": "Default settings",
  	  "settings": {
		"toggleTextShow": "Show",
		"toggleTextHide": "Hide"
  	  },
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
      	"RUB": "Russian ruble",
      	"AUD": "Australian Dollar",
      	"BRL": "Brazilian Real",
      	"CAD": "Canadian dollar",
      	"CHF": "Swiss Franc",
      	"CNY": "Chinese Yuan",
      	"EUR": "Euro",
      	"GBP": "Pound sterling",
      	"HKD": "Hong Kong dollar",
      	"IDR": "Indonesian Rupiah",
      	"INR": "Indian Rupee",
      	"JPY": "Japan Yen",
      	"KRW": "South Korean Won",
      	"MXN": "Mexican Peso"
      }
  },
  "ru": {
      "pageTitle": "Рейтинг криптовалют (Топ 100)",
      "settingsTitle": "Настройки по умолчанию",
  	  "settings": {
		"toggleTextShow": "Показать",
		"toggleTextHide": "Скрыть"
  	  },
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
      	"RUB": "Российский рубль",
      	"AUD": "Австралийский доллар",
      	"BRL": "Бразильский реал",
      	"CAD": "Канадский доллар",
      	"CHF": "Швейцарский франк",
      	"CNY": "Китайский юань",
      	"EUR": "Евро",
      	"GBP": "Фунт стерлингов",
      	"HKD": "Гонконгский доллар",
      	"IDR": "Индонезийская рупия",
      	"INR": "Индийская рупия",
      	"JPY": "Японская иена",
      	"KRW": "Южнокорейская вона",
      	"MXN": "Мексиканское песо"
      }
  }
}
</i18n>

<template>
	<div id="app">
		<div class="container">
			<div class="row">

				<div class="col-12">
					<h1 class="page-title">{{ $t('pageTitle') }}</h1>
				</div>

				<div class="col-12">
					<div class="selectors d-flex flex-column flex-md-row">
						<select class="custom-select selectors__results-count" name="currency__amount" id="" @change="fetchAPI(amount, selectedCurrency)" v-model="amount">
							<option value="10">10</option>
							<option value="20">20</option>
							<option value="30">30</option>
							<option value="50">50</option>
							<option value="100">100</option>
						</select>
						<select class="custom-select selectors__currency" name="currency__choise" id="" @change="fetchAPI(amount, selectedCurrency)" v-model="selectedCurrency">
							<option value="USD">USD ({{ $t('currencies.USD') }})</option>
							<option value="AUD">AUD ({{ $t('currencies.AUD') }})</option>
							<option value="BRL">BRL ({{ $t('currencies.BRL') }})</option>
							<option value="CAD">CAD ({{ $t('currencies.CAD') }})</option>
							<option value="CHF">CHF ({{ $t('currencies.CHF') }})</option>
							<option value="CNY">CNY ({{ $t('currencies.CNY') }})</option>
							<option value="EUR">EUR ({{ $t('currencies.EUR') }})</option>
							<option value="GBP">GBP ({{ $t('currencies.GBP') }})</option>
							<option value="HKD">HKD ({{ $t('currencies.HKD') }})</option>
							<option value="IDR">IDR ({{ $t('currencies.IDR') }})</option>
							<option value="INR">INR ({{ $t('currencies.INR') }})</option>
							<option value="JPY">JPY ({{ $t('currencies.JPY') }})</option>
							<option value="KRW">KRW ({{ $t('currencies.KRW') }})</option>
							<option value="MXN">MXN ({{ $t('currencies.MXN') }})</option>
							<option value="RUB">RUB ({{ $t('currencies.RUB') }})</option>
						</select>

						<select class="custom-select selectors__language" v-model="locale">
							<option>ru</option>
							<option>en</option>
						</select>
					</div>
				</div>

				<div class="col-12">
					<h5>
						{{ $t('settingsTitle') }}
						<span class="settings__toggle-visible" @click="toggleSettings">
							{{ isSettingsHidden ? $t('settings.toggleTextShow') : $t('settings.toggleTextHide') }}
						</span>
					</h5>
					<div class="settings d-flex" :class='{ "settings--hidden": isSettingsHidden }'>
						<div class="settings__limit">
							<select class="custom-select" name="default-limit" id="settings-limit" v-model="amount" @change="changeDefaultLimit">
								<option value="10">10</option>
								<option value="20">20</option>
								<option value="30">30</option>
								<option value="50">50</option>
								<option value="100">100</option>
							</select>
						</div>

						<div class="settings__currency">
							<select class="custom-select" name="default-currency" id="settings-currency" v-model="selectedCurrency" @change="changeDefaultCurrency">
								<option value="USD">USD ({{ $t('currencies.USD') }})</option>
								<option value="AUD">AUD ({{ $t('currencies.AUD') }})</option>
								<option value="BRL">BRL ({{ $t('currencies.BRL') }})</option>
								<option value="CAD">CAD ({{ $t('currencies.CAD') }})</option>
								<option value="CHF">CHF ({{ $t('currencies.CHF') }})</option>
								<option value="CNY">CNY ({{ $t('currencies.CNY') }})</option>
								<option value="EUR">EUR ({{ $t('currencies.EUR') }})</option>
								<option value="GBP">GBP ({{ $t('currencies.GBP') }})</option>
								<option value="HKD">HKD ({{ $t('currencies.HKD') }})</option>
								<option value="IDR">IDR ({{ $t('currencies.IDR') }})</option>
								<option value="INR">INR ({{ $t('currencies.INR') }})</option>
								<option value="JPY">JPY ({{ $t('currencies.JPY') }})</option>
								<option value="KRW">KRW ({{ $t('currencies.KRW') }})</option>
								<option value="MXN">MXN ({{ $t('currencies.MXN') }})</option>
								<option value="RUB">RUB ({{ $t('currencies.RUB') }})</option>
							</select>
						</div>

						<div class="settings__locale">
							<select class="custom-select" name="default-locale" id="settings-locale" v-model="locale" @change="changeDefaultLocale">
								<option value="en">EN</option>
								<option value="ru">RU</option>
							</select>
						</div>

						<div class="settings__update-interval d-flex">
							<input class="form-control settings__update-interval-input" type="number" v-model="updateInterval">
							<button type="button" class="btn btn-success" @click="changeDefaultUpdateInterval">Сохранить</button>
						</div>
					</div>
				</div>

				<div class="col-12">
					<div class="table-responsive">
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
										{{ currencyFormatter(showInSelectedCurrency(currency).convertedPrice) }}
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
										{{ currencyFormatter(showInSelectedCurrency(currency).convertedPriceMC) }}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>




			</div>
		</div>

	</div>
</template>

<script>
import axios from 'axios'
import combineSymbols from './helpers/combineSymbolCodes'

const ls = window.localStorage;

const UPDATE_INTERVAL = parseInt(ls.getItem('cryptorating_default_update_interval')) || 60;
const DEFAULT_CURRENCY = ls.getItem('cryptorating_default_currency') || 'USD';
const DEFAULT_LIMIT = ls.getItem('cryptorating_default_limit') || 10;
const DEFAULT_LOCALE = ls.getItem('cryptorating_default_locale');

export default {
	name: 'app',
	data () {
		return {
			updateInterval: UPDATE_INTERVAL,
			isSettingsHidden: true,
			amount: DEFAULT_LIMIT,
			selectedCurrency: DEFAULT_CURRENCY,
			rating: [],
			assets: {},
			priceDroppedStyles: 'currency__price-down',
			priceUpStyles: 'currency__price-up',
			isFetching: false,
			locale: DEFAULT_LOCALE || this.$i18n.locale || 'en'
		}
	},
	watch: {
		locale (val) {
			this.$i18n.locale = val
		}
	},
	methods: {
		toggleSettings() {
			this.isSettingsHidden = !this.isSettingsHidden;
		},
		changeDefaultLimit() {
			ls.setItem("cryptorating_default_limit", this.amount);
		},
		changeDefaultLocale() {
			ls.setItem("cryptorating_default_locale", this.locale);
		},
		changeDefaultCurrency() {
			ls.setItem("cryptorating_default_currency", this.selectedCurrency);
			this.fetchAPI(this.amount, this.selectedCurrency);
		},
		changeDefaultUpdateInterval() {
			ls.setItem("cryptorating_default_update_interval", this.updateInterval);
		},
		fetchAPI: function(limit = this.amount, convert = '') {
			console.log('start fetching');

			const requestURL = `https://api.coinmarketcap.com/v1/ticker/?limit=${limit}&convert=${convert}`;

			this.isFetching = true;

			axios.get(requestURL)
				.then(response => {
					console.log(response);
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

			symbol = combineSymbols(symbol);

			const imagePath = this.assets[symbol];
			const image = imagePath !== undefined ? imagePath.ImageUrl.replace('/', '') : 'empty'

			return image !== 'empty' ? `https://www.cryptocompare.com/${image}` : 'empty.svg'
		},
		showInSelectedCurrency: function(currencyObject) {
			const selectedCurrency = this.selectedCurrency.toLowerCase();
			const convertedPrice = Number(currencyObject[`price_${selectedCurrency}`]).toFixed(2);
			const convertedPrice24h = currencyObject[`24h_volume_${selectedCurrency}`];
			const convertedPriceMC = currencyObject[`market_cap_${selectedCurrency}`];

			return {
				convertedPrice,
				convertedPrice24h,
				convertedPriceMC
			}
		},
		showCurrencySymbol: function(price) {

		},
		currencyFormatter(price) {

			if(!global.Intl) {
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
			} else {
				const formatter = new Intl.NumberFormat(this.locale, {
					style: "currency",
					currencyDisplay: "symbol",
					minimumFractionDigits: 0,
					currency: this.selectedCurrency
				});

				return formatter.format(price)
			}
		}
	},
	computed: {

	},
	created: function() {

		this.fetchAssets();
		this.fetchAPI(this.amount, this.selectedCurrency);

		this.interval = setInterval(() => {
			this.fetchAPI(this.amount, this.selectedCurrency);
		}, this.updateInterval * 1000);
	},
	beforeDestroy: function(){
		clearInterval(this.interval);
	}
}
</script>

<style>
	body {
		margin-top: 2rem;
	}

	[v-cloak] {
	  visibility: hidden;
	}

	.page-title {
		font-size: 2rem;
	}

	.currency__price-up:before {
		content: '+';
		position: absolute;
		left: 0;
	}

	.currency__price-up {
		color: green;
		position: relative;
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

	.selectors__results-count {
		flex-basis: 15%;
	}

	.selectors__currency {

	}

	.selectors__language {
		flex-basis: 15%;
	}

	.settings__toggle-visible {
		font-size: 0.75rem;
		cursor: pointer;
	}

	.settings {
		margin-bottom: 1rem;
	}

	.settings--hidden {
		display: none !important;
	}

	.settings > div:not(:last-child) {
		margin-right: .5rem;
	}

	.settings__update-interval-input {
		max-width: 70px;
		margin-right: .5rem;
	}

	@media screen and (min-width: 768px) {
		.page-title {
			font-size: 2.5rem;
		}

		.selectors {
			max-width: 70%;
		}

		.selectors__currency {
			margin: 0 .5rem;
		}
	}
</style>
