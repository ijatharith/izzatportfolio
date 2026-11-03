"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { gsap, motion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const PBKDF2_ITERATIONS = 210_000;
const TAG_BYTES = 16;

// Registered here so only the Lab page loads ScrambleText.
gsap.registerPlugin(ScrambleTextPlugin);

const toHex = (b: Uint8Array) => Array.from(b, (x) => x.toString(16).padStart(2, "0"));

async function deriveKey(passphrase: string, salt: Uint8Array<ArrayBuffer>) {
  const base = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(passphrase),
    "PBKDF2",
    false,
    ["deriveKey"],
  );
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", hash: "SHA-256", salt, iterations: PBKDF2_ITERATIONS },
    base,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"],
  );
}

interface Sealed {
  salt: Uint8Array<ArrayBuffer>;
  iv: Uint8Array<ArrayBuffer>;
  /** Ciphertext with the 16-byte GCM tag appended (Web Crypto format). */
  data: Uint8Array<ArrayBuffer>;
  tampered: number | null;
}

type Outcome =
  | { kind: "idle" }
  | { kind: "busy"; text: string }
  | { kind: "ok"; text: string }
  | { kind: "fail"; text: string };

/**
 * AES-256-GCM in the browser: encrypt, flip one bit, and see authenticated
 * decryption refuse the modified ciphertext.
 */
export function CipherBench() {
  const uid = useId();
  const [message, setMessage] = useState("Ideas into reality.");
  const [passphrase, setPassphrase] = useState("");
  const [sealed, setSealed] = useState<Sealed | null>(null);
  const [outcome, setOutcome] = useState<Outcome>({ kind: "idle" });
  const bytesRef = useRef<HTMLDivElement>(null);
  const [plaintext, setPlaintext] = useState<string | null>(null);
  const plainRef = useRef<HTMLParagraphElement>(null);

  // Decrypted text resolves out of hex characters — ciphertext becoming a
  // message. GSAP owns this node's text so React never re-renders mid-scramble.
  useEffect(() => {
    const el = plainRef.current;
    if (!el || plaintext === null) return;
    if (window.matchMedia(motion.queries.reduce).matches) {
      el.textContent = plaintext;
      return;
    }
    const tween = gsap.fromTo(
      el,
      { scrambleText: { text: "" } },
      {
        scrambleText: {
          text: plaintext,
          chars: "0123456789abcdef",
          revealDelay: 0.25,
          speed: 0.6,
        },
        duration: Math.min(1.6, 0.6 + plaintext.length * 0.025),
        ease: "none",
      },
    );
    return () => {
      tween.kill();
    };
  }, [plaintext]);

  const supported = typeof window === "undefined" || Boolean(window.crypto?.subtle);

  async function encrypt() {
    if (!passphrase) {
      setOutcome({ kind: "fail", text: "Enter a passphrase to derive the key." });
      return;
    }
    setOutcome({ kind: "busy", text: "Deriving key and encrypting…" });
    setPlaintext(null);
    try {
      const salt = crypto.getRandomValues(new Uint8Array(16));
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const key = await deriveKey(passphrase, salt);
      const ct = new Uint8Array(
        await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, new TextEncoder().encode(message)),
      );
      setSealed({ salt, iv, data: ct, tampered: null });
      setOutcome({ kind: "ok", text: `Encrypted ${message.length} characters. Now try decrypting — or tamper first.` });
      requestAnimationFrame(() => {
        if (!bytesRef.current || window.matchMedia(motion.queries.reduce).matches) return;
        gsap.from(bytesRef.current.querySelectorAll("[data-byte]"), {
          autoAlpha: 0,
          y: 6,
          duration: 0.3,
          stagger: { each: 0.008, from: "start" },
          ease: motion.ease.out,
        });
      });
    } catch {
      setOutcome({ kind: "fail", text: "Encryption failed in this browser." });
    }
  }

  function tamper() {
    if (!sealed) return;
    const bodyLength = sealed.data.length - TAG_BYTES;
    const index = Math.floor(Math.random() * Math.max(bodyLength, 1));
    const data = new Uint8Array(sealed.data);
    data[index] ^= 1 << Math.floor(Math.random() * 8);
    setSealed({ ...sealed, data, tampered: index });
    setPlaintext(null);
    setOutcome({ kind: "idle" });
    requestAnimationFrame(() => {
      const el = bytesRef.current?.querySelector(`[data-byte="${index}"]`);
      if (el && !window.matchMedia(motion.queries.reduce).matches) {
        gsap.fromTo(el, { scale: 1.6 }, { scale: 1, duration: 0.5, ease: "back.out(3)" });
      }
    });
  }

  async function decrypt() {
    if (!sealed) return;
    setOutcome({ kind: "busy", text: "Deriving key and decrypting…" });
    try {
      const key = await deriveKey(passphrase, sealed.salt);
      const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv: sealed.iv }, key, sealed.data);
      const text = new TextDecoder().decode(pt);
      setPlaintext(text);
      setOutcome({ kind: "ok", text: "Decrypted and authenticated." });
    } catch {
      setPlaintext(null);
      setOutcome({
        kind: "fail",
        text:
          sealed.tampered !== null
            ? `Authentication failed. Byte ${sealed.tampered} was modified, so the GCM tag no longer matches and decryption is refused.`
            : "Authentication failed. The passphrase doesn't match the one used to encrypt.",
      });
    }
  }

  if (!supported) {
    return (
      <p className="rounded-[var(--radius-card)] border border-line bg-white p-6 text-muted">
        This demo needs the Web Crypto API, which is only available over HTTPS in a modern browser.
      </p>
    );
  }

  const hex = sealed ? toHex(sealed.data) : [];
  const bodyLength = sealed ? sealed.data.length - TAG_BYTES : 0;
  const busy = outcome.kind === "busy";

  return (
    <div className="rounded-[var(--radius-card)] border border-line bg-white p-5 md:p-7">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${uid}-msg`} className="meta mb-2 block">
            Message
          </label>
          <input
            id={`${uid}-msg`}
            value={message}
            maxLength={120}
            onChange={(e) => {
              setMessage(e.target.value);
              setSealed(null);
              setPlaintext(null);
            }}
            className="h-11 w-full rounded-lg border border-line bg-paper px-3 text-base outline-none focus:border-accent"
          />
        </div>
        <div>
          <label htmlFor={`${uid}-pass`} className="meta mb-2 block">
            Passphrase
          </label>
          <input
            id={`${uid}-pass`}
            type="password"
            value={passphrase}
            autoComplete="off"
            onChange={(e) => setPassphrase(e.target.value)}
            placeholder="Any passphrase"
            className="h-11 w-full rounded-lg border border-line bg-paper px-3 text-base outline-none focus:border-accent"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={encrypt}
          disabled={busy || !message}
          className="h-10 rounded-full bg-accent px-5 text-sm font-medium text-white transition-colors hover:bg-accent-strong disabled:cursor-not-allowed disabled:opacity-45"
        >
          Encrypt
        </button>
        <button
          type="button"
          onClick={tamper}
          disabled={busy || !sealed}
          className="h-10 rounded-full border border-ink px-5 text-sm font-medium transition-colors hover:bg-ink hover:text-paper disabled:cursor-not-allowed disabled:opacity-40"
        >
          Flip a bit
        </button>
        <button
          type="button"
          onClick={decrypt}
          disabled={busy || !sealed}
          className="h-10 rounded-full border border-ink px-5 text-sm font-medium transition-colors hover:bg-ink hover:text-paper disabled:cursor-not-allowed disabled:opacity-40"
        >
          Decrypt
        </button>
      </div>

      <div className="mt-6 rounded-lg bg-paper p-4">
        {sealed ? (
          <>
            <dl className="grid gap-1 font-mono text-[0.75rem] text-muted sm:grid-cols-[64px_1fr]">
              <dt>salt</dt>
              <dd className="break-all text-ink">{toHex(sealed.salt).join("")}</dd>
              <dt>iv</dt>
              <dd className="break-all text-ink">{toHex(sealed.iv).join("")}</dd>
            </dl>
            <div
              ref={bytesRef}
              className="mt-4 flex flex-wrap gap-1 font-mono text-[0.75rem]"
              aria-label="Ciphertext bytes followed by the authentication tag"
            >
              {hex.map((h, i) => (
                <span
                  key={i}
                  data-byte={i}
                  className={cn(
                    "inline-block rounded px-1 py-0.5",
                    i >= bodyLength
                      ? "bg-accent text-white"
                      : sealed.tampered === i
                        ? "bg-ink text-paper"
                        : "bg-wash text-ink",
                  )}
                >
                  {h}
                </span>
              ))}
            </div>
            <p className="meta mt-3">
              <span className="mr-3 inline-flex items-center gap-1.5">
                <span aria-hidden="true" className="size-2.5 rounded-sm bg-wash ring-1 ring-line" /> ciphertext
              </span>
              <span className="mr-3 inline-flex items-center gap-1.5">
                <span aria-hidden="true" className="size-2.5 rounded-sm bg-accent" /> auth tag
              </span>
              {sealed.tampered !== null && (
                <span className="inline-flex items-center gap-1.5">
                  <span aria-hidden="true" className="size-2.5 rounded-sm bg-ink" /> modified byte
                </span>
              )}
            </p>
          </>
        ) : (
          <p className="meta">Ciphertext appears here after you encrypt.</p>
        )}
      </div>

      <p
        role="status"
        aria-live="polite"
        className={cn(
          "mt-4 min-h-6 text-[0.9375rem]",
          outcome.kind === "fail" && "font-medium text-ink",
          outcome.kind === "ok" && "text-ink",
          outcome.kind === "busy" && "text-muted",
        )}
      >
        {outcome.kind === "fail" && <span aria-hidden="true">✕ </span>}
        {outcome.kind === "ok" && <span aria-hidden="true">✓ </span>}
        {outcome.kind !== "idle" ? outcome.text : ""}
        {outcome.kind === "ok" && plaintext !== null && (
          <span className="sr-only"> Plaintext: {plaintext}</span>
        )}
      </p>

      {plaintext !== null && (
        <div className="mt-3 rounded-lg border border-line bg-paper px-4 py-3" aria-hidden="true">
          <span className="meta">Plaintext</span>
          <p
            ref={plainRef}
            className="mt-1 min-h-7 break-words font-mono text-[1.125rem] tracking-[-0.01em] text-ink"
          />
        </div>
      )}
      <p className="meta mt-2">
        Key: PBKDF2-SHA256, {PBKDF2_ITERATIONS.toLocaleString("en")} iterations. Runs entirely in
        your browser; nothing is sent anywhere.
      </p>
    </div>
  );
}
