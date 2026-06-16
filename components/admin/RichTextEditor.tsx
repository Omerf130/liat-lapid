"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { useEffect } from "react";
import styles from "./RichTextEditor.module.scss";

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  label?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  label,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false, HTMLAttributes: { rel: "noopener" } }),
    ],
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor: ed }) => {
      onChange(ed.getHTML());
    },
    editorProps: {
      attributes: { class: styles.content },
    },
  });

  useEffect(() => {
    if (!editor) return;
    if (editor.getHTML() !== value) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [editor, value]);

  if (!editor) return null;

  function setLink() {
    const previous = editor!.getAttributes("link").href as string | undefined;
    const url = window.prompt("קישור (URL):", previous ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor!.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor!.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }

  return (
    <div className={styles.editor}>
      {label && (
        <span style={{ display: "none" }}>{label}</span>
      )}
      <div className={styles.toolbar}>
        <button
          type="button"
          className={
            editor.isActive("bold") ? styles.toolbarBtnActive : styles.toolbarBtn
          }
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          B
        </button>
        <button
          type="button"
          className={
            editor.isActive("italic")
              ? styles.toolbarBtnActive
              : styles.toolbarBtn
          }
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          I
        </button>
        <button
          type="button"
          className={
            editor.isActive("heading", { level: 2 })
              ? styles.toolbarBtnActive
              : styles.toolbarBtn
          }
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          H2
        </button>
        <button
          type="button"
          className={
            editor.isActive("heading", { level: 3 })
              ? styles.toolbarBtnActive
              : styles.toolbarBtn
          }
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          H3
        </button>
        <button
          type="button"
          className={
            editor.isActive("bulletList")
              ? styles.toolbarBtnActive
              : styles.toolbarBtn
          }
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          • רשימה
        </button>
        <button
          type="button"
          className={
            editor.isActive("orderedList")
              ? styles.toolbarBtnActive
              : styles.toolbarBtn
          }
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          1. רשימה
        </button>
        <button type="button" className={styles.toolbarBtn} onClick={setLink}>
          קישור
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
