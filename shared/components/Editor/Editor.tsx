'use client';
import { Editor as TinyEditor } from '@tinymce/tinymce-react';
import { FC } from 'react';

interface EditorProps {
  html_content: string;
  onChange: (content: string) => void;
}

export const Editor: FC<EditorProps> = ({ html_content, onChange }) => {
  return (
    <TinyEditor
      apiKey={process.env.NEXT_PUBLIC_EDITOR_KEY || ''}
      initialValue={html_content}
      onEditorChange={onChange}
      init={{
        height: 500,
        menubar: false,
        plugins: [
          'advlist',
          'autolink',
          'lists',
          'link',
          'image',
          'charmap',
          'preview',
          'anchor',
          'searchreplace',
          'visualblocks',
          'code',
          'fullscreen',
          'insertdatetime',
          'media',
          'table',
          'code',
          'help',
          'wordcount',
        ],
        toolbar:
          'undo redo | blocks | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
        content_style:
          'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
      }}
    />
  );
};
