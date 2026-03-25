

// Desafio 1

// consecionaria: Tesla X

// Valor Total: y
// Parcela todos os dias por 30 dias
// Primeira parcela: 1$
// Todo dia parcela duplica

// Criar um novo programa que calcila o valor total a ser pago pelo veiculo

function mostrarParcelas() {
    let parcela = 1
    let total = 0

    for (let dia = 1; dia <= 30; dia++) {
        total += parcela

        console.log(
            `Dia ${dia}  Parcela: ${parcela} Total: ${total}`
        )

        parcela *= 2
    }
}

mostrarParcelas()