const comparedSymbols = {
	'MIOTA': 'IOT',
	'BCC': 'BCCOIN',
	'ETHOS': 'BQX'
}

export default (symbol) => {
	if(comparedSymbols[symbol] !== undefined) return comparedSymbols[symbol]
	else return symbol
}