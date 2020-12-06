export const showInfoMessage = (detail, toast, severity, content) => {
	toast.current.show({
		severity,
		summary: 'Obavijest',
		detail,
		life: 3000,
		content,
	})
}

export const showWarningMessage = (toast, content) => {
	toast.current.show({
		severity: 'warn',
		sticky: true,
		content,
	})
}
export const clearMessage = (toast) => {
	toast.current.clear()
}
