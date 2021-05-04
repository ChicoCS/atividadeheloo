
function convertStatusToString(status) {
    switch (status) {
        case 1: return "Planejado"
            break;
        case 2: return "Em Desenvolvimento"
            break;
        case 3: return "Cancelado"
            break;
        case 4: return "Concluído"
            break;
    }
}

export { convertStatusToString };