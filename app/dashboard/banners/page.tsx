'use client';

import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { GripVertical, Plus, Trash2, Upload, Image as ImageIcon } from 'lucide-react';

type Banner = {
  id: string;
  image_url: string;
  link_url: string;
  size: 'sm' | 'md' | 'lg';
  position: number;
  is_active: boolean;
};

const SIZES: Array<Banner['size']> = ['sm', 'md', 'lg'];

export default function BannersPage() {
  const [profileId, setProfileId] = useState('');
  const [banners, setBanners] = useState<Banner[]>([]);
  const [dragging, setDragging] = useState<string | null>(null);
  const [uploading, setUploading] = useState<string | null>(null);
  const fileInputs = useRef<Record<string, HTMLInputElement | null>>({});

  useEffect(() => {
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return;
      setProfileId(u.user.id);
      const { data } = await supabase.from('banners').select('*').eq('profile_id', u.user.id).order('position');
      setBanners((data as Banner[]) ?? []);
    })();
  }, []);

  async function addBanner() {
    const { data } = await supabase.from('banners').insert({
      profile_id: profileId, image_url: '', link_url: '', size: 'md', position: banners.length,
    }).select().single();
    if (data) setBanners([...banners, data as Banner]);
  }

  async function update(id: string, patch: Partial<Banner>) {
    setBanners(banners.map(b => b.id === id ? { ...b, ...patch } : b));
    await supabase.from('banners').update(patch).eq('id', id);
  }

  async function onFile(id: string, file: File) {
    if (!file.type.startsWith('image/')) return alert('Envie um arquivo de imagem.');
    if (file.size > 3 * 1024 * 1024) return alert('Máximo 3MB.');
    setUploading(id);
    const ext = file.name.split('.').pop() || 'png';
    const path = `${profileId}/${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from('banners').upload(path, file, { upsert: false, contentType: file.type });
    if (error) { setUploading(null); alert('Falha no upload: ' + error.message); return; }
    const { data: pub } = supabase.storage.from('banners').getPublicUrl(path);
    const current = banners.find(b => b.id === id);
    if (current?.image_url) {
      const oldPath = extractPath(current.image_url);
      if (oldPath) await supabase.storage.from('banners').remove([oldPath]);
    }
    await update(id, { image_url: pub.publicUrl });
    setUploading(null);
  }

  function extractPath(url: string): string | null {
    const m = url.match(/\/storage\/v1\/object\/public\/banners\/(.+)$/);
    return m ? m[1] : null;
  }

  async function remove(id: string) {
    const b = banners.find(x => x.id === id);
    setBanners(banners.filter(x => x.id !== id));
    if (b?.image_url) {
      const p = extractPath(b.image_url);
      if (p) await supabase.storage.from('banners').remove([p]);
    }
    await supabase.from('banners').delete().eq('id', id);
  }

  async function onDrop(targetId: string) {
    if (!dragging || dragging === targetId) return;
    const ids = banners.map(b => b.id);
    const from = ids.indexOf(dragging);
    const to = ids.indexOf(targetId);
    const reordered = [...banners];
    const [m] = reordered.splice(from, 1);
    reordered.splice(to, 0, m);
    const updated = reordered.map((b, i) => ({ ...b, position: i }));
    setBanners(updated);
    setDragging(null);
    await Promise.all(updated.map(b => supabase.from('banners').update({ position: b.position }).eq('id', b.id)));
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-4xl">Banners</h1>
          <p className="text-sm font-bold text-black/60 mt-1">Faça upload de imagens, defina destino e tamanho.</p>
        </div>
        <button onClick={addBanner} className="brutal-btn bg-bioyellow px-4 py-2 gap-2">
          <Plus className="w-4 h-4" /> Novo banner
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {banners.length === 0 && (
          <div className="brutal-card p-8 text-center">
            <ImageIcon className="w-8 h-8 mx-auto mb-2" />
            <p className="font-bold">Nenhum banner ainda.</p>
          </div>
        )}
        {banners.map(b => (
          <div
            key={b.id}
            draggable
            onDragStart={() => setDragging(b.id)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => onDrop(b.id)}
            className="brutal-card p-4"
          >
            <div className="flex items-start gap-3">
              <GripVertical className="w-5 h-5 mt-3 cursor-grab text-black/60" />
              <div className="flex-1 flex flex-col gap-2">
                {b.image_url ? (
                  <div className="brutal-border overflow-hidden">
                    <img src={b.image_url} alt="" className="w-full h-40 object-cover" />
                  </div>
                ) : (
                  <div className="brutal-border h-40 flex items-center justify-center bg-white">
                    <span className="text-xs font-bold text-black/50">Sem imagem</span>
                  </div>
                )}
                <input
                  ref={el => (fileInputs.current[b.id] = el)}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={e => { const f = e.target.files?.[0]; if (f) onFile(b.id, f); }}
                />
                <button
                  onClick={() => fileInputs.current[b.id]?.click()}
                  disabled={uploading === b.id}
                  className="brutal-btn bg-white px-3 py-2 text-sm gap-2 disabled:opacity-60"
                >
                  <Upload className="w-4 h-4" /> {uploading === b.id ? 'Enviando...' : b.image_url ? 'Trocar imagem' : 'Enviar imagem'}
                </button>
                <input
                  value={b.link_url}
                  onChange={e => update(b.id, { link_url: e.target.value })}
                  className="brutal-input px-3 py-2 text-sm"
                  placeholder="Link de destino (opcional)"
                />
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex gap-1">
                    {SIZES.map(s => (
                      <button
                        key={s}
                        onClick={() => update(b.id, { size: s })}
                        className={`brutal-border px-3 py-1 text-xs font-bold uppercase ${b.size === s ? 'bg-bioblue text-white' : 'bg-white'}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                  <label className="flex items-center gap-2 text-xs font-bold">
                    <input type="checkbox" checked={b.is_active} onChange={e => update(b.id, { is_active: e.target.checked })} />
                    Ativo
                  </label>
                </div>
              </div>
              <button onClick={() => remove(b.id)} className="brutal-btn bg-white w-9 h-9">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
