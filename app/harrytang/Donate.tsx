"use client";

import { useRef, useState } from "react";
import { coins, describe, getCoin, getNetwork, qrPayload, sampleDonations, type CoinId } from "./donation.config";
import { Footer, Header } from "./Chrome";
import { QR } from "./QR";

const Check = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);
const Copy = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="9" y="9" width="11" height="11" rx="2.5" />
    <path d="M5 15V6.5A2.5 2.5 0 0 1 7.5 4H15" />
  </svg>
);
const Warn = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 3 2.5 20h19Z" />
    <path d="M12 10v4.5M12 17.6v.1" />
  </svg>
);
const Grid = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" aria-hidden>
    <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
    <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
    <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
    <path d="M14 14h2.5v2.5H14zM18 18h2.5v2.5H18zM18 14h2.5" />
  </svg>
);

function Label({ children }: { children: React.ReactNode }) {
  return <p className="ht-label">{children}</p>;
}

function Result({ coinId, networkId }: { coinId: CoinId | null; networkId: string | null }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const coin = getCoin(coinId);
  const net = getNetwork(coinId, networkId);

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 2200);
  };

  // Nothing about the address or QR exists in the page until both choices are made.
  if (!coin) {
    return (
      <div className="ht-result ht-result-empty" aria-live="polite">
        <Grid />
        <p className="ht-result-title">Your address and QR code appear here</p>
        <p>Start by choosing a coin. They stay hidden until you have chosen a network too.</p>
      </div>
    );
  }
  if (!net) {
    return (
      <div className="ht-result ht-result-empty" aria-live="polite">
        <Grid />
        <p className="ht-result-title">One more step</p>
        <p>
          Choose the network you will send {coin.symbol} on. The right address depends on it.
        </p>
      </div>
    );
  }

  const address = qrPayload(net); // the same value feeds the QR, the text and the copy button
  const head = address.slice(0, 6);
  const tail = address.slice(-6);
  const mid = address.slice(6, -6);

  return (
    <div className="ht-result" aria-live="polite">
      <div className="ht-result-head">
        <span className="ht-chip">{describe(coin, net)}</span>
      </div>

      <div className="ht-qr-wrap">
        <QR value={address} label={`QR code for the ${describe(coin, net)} address`} />
      </div>

      <div className="ht-addr">
        <p className="ht-addr-l">Receiving address</p>
        <code className="ht-addr-v">
          <b>{head}</b>
          {mid}
          <b>{tail}</b>
        </code>
        <p className="ht-hint">Check that the first and last six characters match in your wallet before you send.</p>
      </div>

      <button type="button" className={`ht-copy ${copied ? "is-done" : ""}`} onClick={() => copy(address)}>
        {copied ? <Check /> : <Copy />}
        <span>{copied ? "Copied" : "Copy address"}</span>
      </button>
      <span className="ht-sr" role="status">
        {copied ? "Address copied to clipboard" : ""}
      </span>

      <div className="ht-warn" role="note">
        <Warn />
        <div>
          <p className="ht-warn-t">Use the right network</p>
          <p>
            Send only <strong>{coin.symbol}</strong> on <strong>{net.label}</strong>
            {net.standard ? ` (${net.standard})` : ""}. Funds sent on the wrong network cannot be recovered.
          </p>
        </div>
      </div>
    </div>
  );
}

const how = [
  ["Choose a coin", "Pick BTC, USDC or USDT. Nothing is shown until you decide."],
  ["Pick the network", "Stablecoins live on several networks. Choose the one your wallet or exchange uses."],
  ["Scan or copy", "Scan the QR code or copy the address, then send from your wallet."],
];

const faq = [
  ["Is this safe?", "The page only ever shows public receiving addresses. No keys or seed phrases are involved."],
  ["Which network should I choose?", "Use the network your wallet or exchange supports for that coin. If unsure, pick the cheapest one it offers."],
  ["Will I get a receipt?", "Blockchain transfers are public. Your transaction appears in the recent donations list once it is confirmed."],
  ["Can I send a different coin?", "Please don't. Only the coins and networks listed here are monitored, and other assets may be lost."],
];

export function Donate() {
  const [coinId, setCoinId] = useState<CoinId | null>(null);
  const [networkId, setNetworkId] = useState<string | null>(null);
  const coin = getCoin(coinId);
  const multi = !!coin && coin.networks.length > 1;

  const pickCoin = (id: CoinId) => {
    setCoinId(id);
    setNetworkId(null);
  };

  return (
    <>
      <Header />
      <main id="main-content" className="ht-main">
        <div className="ht-banner" role="note">
          <span>Preview for review</span> Addresses, FAQ wording and the donations list are placeholders. Please do not send funds.
        </div>

        <section className="ht-hero">
          <div className="ht-wrap">
            <h1 className="ht-h1">
              Support the blog,
              <br />
              <span>send a tip in crypto.</span>
            </h1>
            <p className="ht-lead">
              If an article saved you time, you can say thanks directly. No account, no platform in between. It goes
              straight to my wallet.
            </p>
          </div>
        </section>

        <section className="ht-wrap ht-flow" aria-labelledby="flow-h">
          <div className="ht-steps">
            <h2 id="flow-h" className="ht-sr">
              Choose how to donate
            </h2>

            <fieldset className="ht-fieldset">
              <legend>
                <Label>1 · Choose a coin</Label>
              </legend>
              <div className="ht-opts ht-opts-3">
                {coins.map((c) => (
                  <label key={c.id} className="ht-opt">
                    <input type="radio" name="coin" value={c.id} checked={coinId === c.id} onChange={() => pickCoin(c.id)} />
                    <span className="ht-glyph" aria-hidden>
                      {c.glyph}
                    </span>
                    <span className="ht-opt-t">
                      {c.symbol}
                      <small>{c.name}</small>
                    </span>
                    <span className="ht-opt-b">{c.blurb}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {coin && multi && (
              <fieldset className="ht-fieldset ht-rise" key={coin.id}>
                <legend>
                  <Label>2 · Choose the network for {coin.symbol}</Label>
                </legend>
                <div className="ht-opts ht-opts-net">
                  {coin.networks.map((n) => (
                    <label key={n.id} className="ht-opt ht-opt-net">
                      <input type="radio" name="network" value={n.id} checked={networkId === n.id} onChange={() => setNetworkId(n.id)} />
                      <span className="ht-opt-t">
                        {n.label}
                        {n.standard && <small>{n.standard}</small>}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            )}

            {coin && !multi && (
              <p className="ht-note ht-rise" key={coin.id}>
                {coin.symbol} has one network ({coin.networks[0].label}), so there is nothing more to choose.
              </p>
            )}
          </div>

          <aside className="ht-aside" aria-label="Receiving address">
            <Result coinId={coinId} networkId={networkId} />
          </aside>
        </section>

        <section className="ht-wrap ht-block" aria-labelledby="recent-h">
          <div className="ht-block-head">
            <h2 id="recent-h" className="ht-h2">
              Recent donations
            </h2>
            <span className="ht-sample">Sample data</span>
          </div>
          <ul className="ht-list">
            {sampleDonations.map((d) => (
              <li key={d.from + d.when}>
                <span className="ht-chip">
                  {d.coin} · {d.net}
                </span>
                <strong>
                  {d.amount} {d.coin}
                </strong>
                <span className="ht-muted">from {d.from}</span>
                <time className="ht-muted">{d.when}</time>
              </li>
            ))}
          </ul>
          <p className="ht-foot">
            The live page reads transactions to the addresses above from a public blockchain API and refreshes every minute. Donor addresses are shortened.
          </p>
        </section>

        <section className="ht-wrap ht-block" aria-labelledby="how-h">
          <h2 id="how-h" className="ht-h2">
            How it works
          </h2>
          <ol className="ht-how">
            {how.map(([t, d], i) => (
              <li key={t}>
                <span>0{i + 1}</span>
                <h3>{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="ht-wrap ht-block ht-narrow" aria-labelledby="faq-h">
          <h2 id="faq-h" className="ht-h2">
            Questions
          </h2>
          <div className="ht-faq">
            {faq.map(([q, a]) => (
              <details key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
