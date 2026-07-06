"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Placeholder from "@tiptap/extension-placeholder";

interface AdminEditorProps {
  content: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

const toolbarBtn = "p-2 rounded-lg hover:bg-white/10 transition-colors text-muted hover:text-foreground disabled:opacity-30";
const toolbarActive = "!text-primary !bg-primary/10";

export function AdminEditor({ content, onChange, placeholder = "İçeriği yazın..." }: AdminEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Underline,
      Subscript,
      Superscript,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({ openOnClick: false, autolink: true }),
      Image.configure({ inline: false, allowBase64: false }),
      Placeholder.configure({ placeholder }),
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none min-h-[200px] p-4 text-foreground focus:outline-none [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mb-2 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mb-2 [&_p]:mb-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_a]:text-primary [&_a]:underline [&_img]:rounded-lg [&_img]:max-w-full",
      },
    },
  });

  if (!editor) return null;

  const addImage = () => {
    const url = prompt("Görsel URL'si:");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const addLink = () => {
    const url = prompt("Link URL'si:");
    if (url) editor.chain().focus().setLink({ href: url, target: "_blank" }).run();
  };

  return (
    <div className="border border-white/20 rounded-xl overflow-hidden bg-white/5">
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-white/10 bg-white/5">
        <button onClick={() => editor.chain().focus().toggleBold().run()} className={`${toolbarBtn} ${editor.isActive("bold") ? toolbarActive : ""}`} title="Kalın">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/><path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"/></svg>
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`${toolbarBtn} ${editor.isActive("italic") ? toolbarActive : ""}`} title="İtalik">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="4" x2="10" y2="4"/><line x1="14" y1="20" x2="5" y2="20"/><line x1="15" y1="4" x2="9" y2="20"/></svg>
        </button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={`${toolbarBtn} ${editor.isActive("underline") ? toolbarActive : ""}`} title="Altı çizili">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"/><line x1="4" y1="21" x2="20" y2="21"/></svg>
        </button>

        <div className="w-px h-6 bg-white/10 mx-1" />

        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`${toolbarBtn} ${editor.isActive("heading", { level: 2 }) ? toolbarActive : ""}`} title="Başlık 2">
          <span className="text-xs font-bold">H2</span>
        </button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={`${toolbarBtn} ${editor.isActive("heading", { level: 3 }) ? toolbarActive : ""}`} title="Başlık 3">
          <span className="text-xs font-bold">H3</span>
        </button>

        <div className="w-px h-6 bg-white/10 mx-1" />

        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={`${toolbarBtn} ${editor.isActive("bulletList") ? toolbarActive : ""}`} title="Liste">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
        </button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`${toolbarBtn} ${editor.isActive("orderedList") ? toolbarActive : ""}`} title="Numaralı liste">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/><path d="M4 6h1v4"/><path d="M4 10h2"/><path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"/></svg>
        </button>

        <div className="w-px h-6 bg-white/10 mx-1" />

        <button onClick={() => editor.chain().focus().setTextAlign("left").run()} className={`${toolbarBtn} ${editor.isActive({ textAlign: "left" }) ? toolbarActive : ""}`} title="Sola hizala">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="15" y2="12"/><line x1="3" y1="18" x2="18" y2="18"/></svg>
        </button>
        <button onClick={() => editor.chain().focus().setTextAlign("center").run()} className={`${toolbarBtn} ${editor.isActive({ textAlign: "center" }) ? toolbarActive : ""}`} title="Ortala">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="6" y1="12" x2="18" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
        </button>
        <button onClick={() => editor.chain().focus().setTextAlign("right").run()} className={`${toolbarBtn} ${editor.isActive({ textAlign: "right" }) ? toolbarActive : ""}`} title="Sağa hizala">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="9" y1="12" x2="21" y2="12"/><line x1="6" y1="18" x2="21" y2="18"/></svg>
        </button>

        <div className="w-px h-6 bg-white/10 mx-1" />

        <button onClick={addLink} className={`${toolbarBtn} ${editor.isActive("link") ? toolbarActive : ""}`} title="Link ekle">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
        </button>
        <button onClick={addImage} className={toolbarBtn} title="Görsel ekle">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
        </button>

        <div className="w-px h-6 bg-white/10 mx-1" />

        <button onClick={() => editor.chain().focus().undo().run()} className={toolbarBtn} title="Geri al">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
        </button>
        <button onClick={() => editor.chain().focus().redo().run()} className={toolbarBtn} title="İleri al">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.13-9.36L23 10"/></svg>
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
