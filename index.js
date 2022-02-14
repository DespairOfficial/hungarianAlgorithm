// const matrix = [[3, 8, 2, 10, 3], [8, 7, 2, 9, 7], [6, 4, 2, 7, 5], [8, 4, 2, 3, 5], [9, 10, 6, 9, 10]]
const matrix = [[3, 9, 2, 3, 7], [6, 1, 5, 6, 6], [9, 4, 7, 10, 3], [2, 5, 4, 2, 1], [9, 6, 2, 4, 5]]
const answers = []
function isInAnswers (x, y) {
	let result = false
	answers.forEach((element) => {
		if (((element[0] === x) || element[1] === y)) {
			result = true
		}
	})
	return result
}

function handleRows () {
	for (let i = 0; i < matrix.length; i++) {
		let minimal = Infinity
		for (let j = 0; j < matrix.length; j++) {
			if (matrix[i][j] < minimal) { minimal = matrix[i][j] }
		}
		for (let j = 0; j < matrix.length; j++) {
			matrix[i][j] -= minimal
		}
	}
}
function handleColumns () {
	for (let i = 0; i < matrix.length; i++) {
		for (let j = 0; j < matrix.length; j++) {
			let minimal = Infinity
			for (let j = 0; j < matrix.length; j++) {
				if (matrix[j][i] < minimal) { minimal = matrix[j][i] }
			}
			for (let j = 0; j < matrix.length; j++) {
				matrix[j][i] -= minimal
			}
		}
	}
}
function marking () {
	for (let index = 0; index < matrix.length; index++) {
		let candidateToAnswersRow = -1
		let minimumZerosInRow = Infinity
		for (let i = 0; i < matrix.length; i++) {
			let inRowCounter = 0
			for (let j = 0; j < matrix.length; j++) {
				if (matrix[i][j] === 0 && !isInAnswers(i, j)) {
					inRowCounter += 1
				}
			}
			if (inRowCounter < minimumZerosInRow && inRowCounter !== 0) {
				minimumZerosInRow = inRowCounter
				candidateToAnswersRow = i
			}
		}

		for (let i = 0; i < matrix.length; i++) {
			if (matrix[candidateToAnswersRow][i] === 0 && !isInAnswers(candidateToAnswersRow, i)) {
				answers.push([candidateToAnswersRow, i])
			}
		}

		// let candidateToAnswersColumn = -1
		// let minimumZerosInColumn = Infinity
		// for (let i = 0; i < matrix.length; i++) {
		// 	let inColumnCounter = 0
		// 	for (let j = 0; j < matrix.length; j++) {
		// 		if (matrix[j][i] === 0 && !isInAnswers(i, j)) {
		// 			inColumnCounter += 1
		// 		}
		// 	}
		// 	if (inColumnCounter < minimumZerosInColumn && inColumnCounter !== 0) {
		// 		minimumZerosInColumn = inColumnCounter
		// 		candidateToAnswersColumn = i
		// 	}
		// }
		// for (let i = 0; i < matrix.length; i++) {
		// 	if (matrix[i][candidateToAnswersColumn] === 0 && !isInAnswers(i, candidateToAnswersColumn)) {
		// 		answers.push([i, candidateToAnswersColumn])
		// 	}
		// }
	}
}

const crossedRows = []
const crossedColumns = []

function crossing (copyMatrix) {
	for (let k = 0; k < copyMatrix.length; k++) {
		let maxZerosInRow = -1
		let maxRow = -1

		let maxZerosInColumn = -1
		let maxCol = -1
		for (let i = 0; i < copyMatrix.length; i++) {
			if (!crossedRows.includes(i)) {
				let zeroCounter = 0
				for (let j = 0; j < copyMatrix.length; j++) {
					if (copyMatrix[i][j] === 0) zeroCounter += 1
				}
				if (zeroCounter > maxZerosInRow && zeroCounter !== 0) {
					maxZerosInRow = zeroCounter
					maxRow = i
				}
			}
		}
		if (maxRow !== -1) {
			crossedRows.push(maxRow)
			for (let i = 0; i < copyMatrix.length; i++) {
				copyMatrix[maxRow][i] = Infinity
			}
		}
		for (let i = 0; i < copyMatrix.length; i++) {
			if (!crossedColumns.includes(i)) {
				let zeroCounter = 0
				for (let j = 0; j < copyMatrix.length; j++) {
					if (copyMatrix[j][i] === 0) zeroCounter += 1
				}
				if (zeroCounter > maxZerosInColumn && zeroCounter !== 0) {
					maxZerosInColumn = zeroCounter
					maxCol = i
				}
			}
		}
		if (maxRow !== -1) {
			crossedColumns.push(maxCol)
			for (let i = 0; i < copyMatrix.length; i++) {
				copyMatrix[i][maxCol] = Infinity
			}
		}
	}
}
function getCopyOfMatrix (m) {
	const copyOfMatrix = []
	for (let i = 0; i < m.length; i++) {
		const row = []
		for (let j = 0; j < m.length; j++) {
			row.push(m[i][j])
		}
		copyOfMatrix.push(row)
	}
	return copyOfMatrix
}
function minPlusUncrossed () {
	let minimal = Infinity
	for (let i = 0; i < matrix.length; i++) {
		for (let j = 0; j < matrix.length; j++) {
			if ((matrix[i][j] < minimal) && (crossedRows.indexOf(i) === -1) && (crossedColumns.indexOf(j) === -1)) {
				minimal = matrix[i][j]
			}
		}
	}
	for (let i = 0; i < matrix.length; i++) {
		for (let j = 0; j < matrix.length; j++) {
			if ((crossedRows.indexOf(i) === -1) && (crossedColumns.indexOf(j) === -1)) {
				matrix[i][j] -= minimal
			} else if ((crossedRows.indexOf(i) !== -1) && (crossedColumns.indexOf(j) !== -1)) {
				matrix[i][j] += minimal
			}
		}
	}
}

function solve () {
	handleRows()
	handleColumns()
	const copyOfMatrix = getCopyOfMatrix(matrix)
	crossing(copyOfMatrix)
	minPlusUncrossed()
	console.log(matrix)
	marking()
	console.log(answers)
}
solve()
