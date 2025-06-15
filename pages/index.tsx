
import { useState } from 'react';

export default function Home() {
  const [registro, setRegistro] = useState([]);
  const [data, setData] = useState("");
  const [km, setKm] = useState("");
  const [ganhoBruto, setGanhoBruto] = useState("");

  const custoPorLitro = 6;
  const kmPorLitro = 30;
  const manutencaoPerc = 0.3;
  const metaLucroMensal = 5000;
  const metaPorKm = 1.62;

  const calcular = () => {
    const kmRodado = parseFloat(km);
    const bruto = parseFloat(ganhoBruto);
    const manutencao = bruto * manutencaoPerc;
    const combustivel = (kmRodado / kmPorLitro) * custoPorLitro;
    const liquido = bruto - manutencao - combustivel;
    const precoPorKm = bruto / kmRodado;

    const novoRegistro = {
      data,
      km: kmRodado,
      ganhoBruto: bruto,
      manutencao,
      combustivel,
      lucro: liquido,
      precoPorKm,
    };

    setRegistro([novoRegistro, ...registro]);
    setData("");
    setKm("");
    setGanhoBruto("");
  };

  const total = registro.reduce((acc, r) => {
    acc.km += r.km;
    acc.ganho += r.ganhoBruto;
    acc.lucro += r.lucro;
    return acc;
  }, { km: 0, ganho: 0, lucro: 0 });

  return (
    <main style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>Uber Meta Tracker</h1>
      <div style={{ marginBottom: 20 }}>
        <input placeholder="Data" value={data} onChange={e => setData(e.target.value)} />
        <input placeholder="KM rodado" value={km} onChange={e => setKm(e.target.value)} />
        <input placeholder="Ganho bruto (R$)" value={ganhoBruto} onChange={e => setGanhoBruto(e.target.value)} />
        <button onClick={calcular}>Calcular</button>
      </div>

      {registro.map((r, i) => (
        <div key={i} style={{ border: '1px solid #ccc', marginBottom: 10, padding: 10 }}>
          <strong>{r.data}</strong><br />
          KM: {r.km} | Bruto: R${r.ganhoBruto.toFixed(2)}<br />
          Manutenção: R${r.manutencao.toFixed(2)} | Gasolina: R${r.combustivel.toFixed(2)}<br />
          Lucro líquido: <strong style={{ color: r.lucro >= 0 ? 'green' : 'red' }}>R${r.lucro.toFixed(2)}</strong><br />
          Valor por KM: <strong style={{ color: r.precoPorKm >= metaPorKm ? 'green' : 'red' }}>R${r.precoPorKm.toFixed(2)}</strong>
        </div>
      ))}

      <h2>Resumo do mês</h2>
      <p>Total KM: {total.km}</p>
      <p>Total Ganho Bruto: R${total.ganho.toFixed(2)}</p>
      <p>Total Lucro Líquido: R${total.lucro.toFixed(2)}</p>
    </main>
  );
}
