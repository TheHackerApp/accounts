async function loadEncryptionKey(): Promise<CryptoKey> {
  const encoded = process.env.SSR_ONLY_KEY;
  if (encoded === undefined) throw new Error('Missing environment variable SSR_ONLY_KEY');

  const bytes = Buffer.from(encoded, 'base64');
  return crypto.subtle.importKey('raw', bytes, 'AES-GCM', false, ['encrypt', 'decrypt']);
}

function serialize(cipher: ArrayBuffer, iv: Uint8Array): string {
  return Buffer.from(cipher).toString('base64') + ':' + Buffer.from(iv).toString('base64');
}

function deserialize(serialized: string): readonly [Buffer, Uint8Array] {
  const [cipher, iv] = serialized.split(':');
  return [Buffer.from(cipher, 'base64'), Uint8Array.from(Buffer.from(iv, 'base64'))] as const;
}

/**
 * Cloak a value to only be accessible during server-side rendering
 */
export async function cloakSsrOnly(secret: string | undefined): Promise<string | undefined> {
  if (secret === undefined) return undefined;

  const key = await loadEncryptionKey();
  const encoded = new TextEncoder().encode(secret);

  const iv = crypto.getRandomValues(new Uint8Array(16));
  const cipher = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoded);
  return serialize(cipher, iv);
}

/**
 * Uncloak a value that can only be accessed during server-side rendering
 */
export async function uncloakSsrOnly(secret: string | undefined): Promise<string | undefined> {
  if (typeof window !== 'undefined' || secret === undefined) return undefined;

  const key = await loadEncryptionKey();
  const [cipher, iv] = deserialize(secret);

  const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, cipher);
  return new TextDecoder().decode(decrypted);
}
