let itens = [];

document.getElementById("addItemBtn").addEventListener("click", adicionarItem);
document.getElementById("resetBtn").addEventListener("click", resetarCalculadora);

function adicionarItem() {
    const select = document.getElementById("itemSelect");
    const selectedItem = select.options[select.selectedIndex];
    const item = {
        nome: selectedItem.text.split(" - ")[0],
        preco: parseFloat(selectedItem.text.split(" - ")[1].replace("R$", "").replace(".", "").replace(",", ".").trim()),
        quantidade: parseInt(document.getElementById("quantityInput").value)
    };

    itens.push(item);
    exibirItens();
    calcularTotal();
}

function formatarNumero(numero) {
    return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function exibirItens() {
    const listaItens = document.querySelector("#listaItens tbody");
    listaItens.innerHTML = "";
    itens.forEach(item => {
        const row = listaItens.insertRow();
        const cellNome = row.insertCell(0);
        const cellQuantidade = row.insertCell(1);
        const cellPreco = row.insertCell(2);

        cellNome.textContent = item.nome;
        cellQuantidade.textContent = item.quantidade;
        cellPreco.textContent = `R$ ${formatarNumero((item.preco * item.quantidade).toFixed(2))}`;
    });
}

function calcularTotal() {
    let total = 0;
    itens.forEach(item => {
        total += item.preco * item.quantidade;
    });

    const totalFormatado = formatarNumero(total.toFixed(2));
    document.getElementById("total").textContent = `Total: R$ ${totalFormatado}`;

    const desconto = total * 0.1;
    const totalComDesconto = total - desconto;
    const totalComDescontoFormatado = formatarNumero(totalComDesconto.toFixed(2));
    document.getElementById("totalComDesconto").textContent = `Total a Depositar no Painel (10% de comissão): R$ ${totalComDescontoFormatado}`;
}

function resetarCalculadora() {
    itens = [];
    exibirItens();
    calcularTotal();
}
