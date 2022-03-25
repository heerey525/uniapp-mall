export const formatDate = val => {
	const nDate = new Date(val)
	const year = nDate.getFullYear()
	const month = (nDate.getMonth() + 1).toString().padStart(2, 0)
	const day = nDate.getDate().toString().padStart(2, 0)
	return `${year}-${month}-${day}`
}
