export default async function PrintAll(params: Promise<{ clientId: string }>) {
    const { clientId } = await params;
    return (
        <main>
            <section className="page">
                <h1>Cliente {clientId} — Capa</h1>
            </section>
            <section className="page"><h2>Visão Geral</h2></section>
            <section className="page"><h2>Performance</h2></section>
            <section className="page"><h2>Exposição & Suitability</h2></section>
            <section className="page"><h2>Alocação</h2></section>
            <section className="page"><h2>Instituições</h2></section>
            <section className="page"><h2>Posições</h2></section>
            <section className="page"><h2>Liquidez</h2></section>
            <section className="page"><h2>Movimentações</h2></section>
            <section className="page"><small>Disclaimer</small></section>
        </main>
    );
}
