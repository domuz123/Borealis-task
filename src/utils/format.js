export const format = (amount, dc, d, t) => {
	let decimalCount = dc ? dc : 2,
		decimal = d ? d : ',',
		thousands = t ? t : '.'
	try {
		decimalCount = Math.abs(decimalCount)
		decimalCount = isNaN(decimalCount) ? 2 : decimalCount

		const negativeSign = amount < 0 ? '-' : ''

		let i = parseInt(
			(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
		).toString()
		let j = i.length > 3 ? i.length % 3 : 0

		return (
			negativeSign +
			(j ? i.substr(0, j) + thousands : '') +
			i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
			(decimalCount
				? decimal +
				  Math.abs(amount - i)
						.toFixed(decimalCount)
						.slice(2)
				: '')
		)
	} catch (e) {
		console.log(e)
	}
}

export function formatPhoneNumb(phone) {
	let cleaned = ('' + phone).replace(/\D/g, '')
	let expr =
		cleaned.length === 10
			? /^(1|)?(\d{3})(\d{3})(\d{4})$/
			: /^(1|)?(\d{3})(\d{3})(\d{3})$/
	let match = cleaned.match(expr)

	if (match) {
		let intlCode = match[1] ? '+1 ' : ''
		return [intlCode, '', match[2], ' ', match[3], ' ', match[4]].join('')
	} else return cleaned
}
